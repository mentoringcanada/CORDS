# Creates a Postgres RDS instance.
resource "aws_db_instance" "cords-postgres-db" {
  identifier            = "cordsdatabase"
  storage_type          = "gp2" # General Purpose (Optional)
  allocated_storage     = 20
  engine                = "postgres"
  engine_version        = "13.4" # (Optional)
  instance_class        = "db.m6g.large"
  # The name of the DB subnet group. The DB instance will be created in the vpc associated with the db subnet group.
#   db_subnet_group_name  = "default-vpc-0c5d7bd061dfaeb27"
  name                  = "cordsDB"  # Name of the database.
  username              = var.username
  password              = var.password
  publicly_accessible   = true
  skip_final_snapshot   = true

  tags = {
      Name              = "CORDS PostgresQL DB Instance"
  } 
}
