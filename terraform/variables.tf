variable "aws_region" {
  default = "us-east-1"
}

variable "aws_profile" {
  default = "dev"
}

variable "vpc_cidr" {
  default = "172.16.0.0/12"
}

variable "vpc_name" {
  default = "MyVPC"
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["172.16.1.0/24", "172.16.2.0/24", "172.16.3.0/24"]
}

variable "private_subnet_cidrs" {
  type    = list(string)
  default = ["172.16.4.0/24", "172.16.5.0/24", "172.16.6.0/24"]
}
