# HuskyConnect

**HuskyConnect** is a social networking web application built for Northeastern University students to interact with campus committees, share updates, and stay engaged. Developed as part of the CSYE 7230: Software Engineering course, this project simulates a real-world scalable and maintainable platform.

## 🌟 Features

- Student registration with NEU email and identity verification
- User authentication and profile management
- Join and interact with student committees
- Post creation with like and comment functionality
- Personalized feed from joined committees
- Real-time notifications
- Admin panel for user and content moderation

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- RESTful APIs

### Database
- PostgreSQL

### Cloud & Infrastructure
- AWS EC2 (App hosting)
- AWS Lambda (Background tasks)
- AWS Load Balancer
- Terraform (Infrastructure as code)

### Email & Notifications
- SendGrid (Email service)
- In-app notifications

### Authentication
- JWT (JSON Web Tokens)
- NEU Authentication System (Email and student status verification)

## 📁 Project Structure

```
.
├── backend/               # REST API services
├── frontend/              # React web client
├── terraform/             # Infrastructure definitions
├── scripts/               # Utilities and setup scripts
```

## 👨‍💻 Team Members

- Chaitya Vohera
- Foram Trivedi
- Kedar Apte
- Nilvi Shah
- Malav Bhatt

## 🏁 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ChaityaVohera/CSYE-7230.git
   ```

2. Setup backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Setup frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Configure `.env` files using provided `.env.example` templates in both `frontend/` and `backend/`.

## 📝 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

> Built for the CSYE 7230 Software Engineering course @ Northeastern University.
