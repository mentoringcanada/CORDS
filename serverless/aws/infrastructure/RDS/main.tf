provider "aws" {
  profile = "default"
  region = "us-east-1"
}
resource "aws_instance" "instance1" {
 ami = "ami-0dd9f0e7df0f0a138"
 instance_type = "t2.medium"
 tags = {
    Name = "211"
  }
}