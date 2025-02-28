locals {
  public_subnet_tags = {
    Name = "Public-Subnet"
  }

  private_subnet_tags = {
    Name = "Private-Subnet"
  }

  common_tags = {
    Project   = "Terraform AWS Infrastructure"
    ManagedBy = "Terraform"
  }
}
