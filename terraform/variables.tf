variable "bucket_name" {
  description = "Nombre del bucket S3"
  type        = string
  default     = "tienda-ra6"
}

variable "region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

variable "tags" {
  description = "Etiquetas del bucket"
  type        = map(string)
  default     = {
    Name = "Tienda Bucket"
  }
}
