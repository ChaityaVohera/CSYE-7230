#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define database credentials
DB_USER="csye6225"
DB_PASS="csye6225"
DB_NAME="webapp"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Update package lists and upgrade packages
log_message "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install PostgreSQL
log_message "Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Install Node.js and npm
log_message "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Create application group and user
log_message "Creating application user and group..."
groupadd -f csye6225
useradd -m -s /bin/bash -g csye6225 csye6225 || true

# Create application directory
log_message "Creating application directory..."
mkdir -p /opt/csye6225
chown csye6225:csye6225 /opt/csye6225

# Setup PostgreSQL
log_message "Configuring PostgreSQL..."
# Start PostgreSQL if not running
systemctl start postgresql
systemctl enable postgresql

# Create database user and database
sudo -u postgres psql << EOF
CREATE USER csye6225 WITH PASSWORD 'csye6225';
CREATE DATABASE webapp OWNER csye6225;
\c webapp
CREATE TABLE IF NOT EXISTS health_check (
    check_id SERIAL PRIMARY KEY,
    datetime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
GRANT ALL PRIVILEGES ON DATABASE webapp TO csye6225;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csye6225;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO csye6225;
\q
EOF

# Deploy application
log_message "Deploying application..."
if [ -f webapp.zip ]; then
    unzip -o webapp.zip -d /opt/csye6225/
    chown -R csye6225:csye6225 /opt/csye6225
    chmod -R 755 /opt/csye6225
else
    log_message "Error: webapp.zip not found!"
    exit 1
fi

# Create .env file
log_message "Creating environment file..."
cat > /opt/csye6225/.env << EOF
PORT=8080
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_HOST=localhost
DB_PORT=5432
EOF

# Install application dependencies
log_message "Installing application dependencies..."
cd /opt/csye6225/webapp
npm install

# Create systemd service
log_message "Creating systemd service..."
cat > /etc/systemd/system/webapp.service << EOF
[Unit]
Description=CSYE6225 Web Application
After=network.target postgresql.service

[Service]
Type=simple
User=csye6225
WorkingDirectory=/opt/csye6225/webapp
Environment=NODE_ENV=production
ExecStart=/usr/bin/node app.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start the application
log_message "Starting the application..."
systemctl daemon-reload
systemctl enable webapp
systemctl start webapp

log_message "Setup completed successfully!"c