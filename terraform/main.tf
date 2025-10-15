provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "tienda" {
  bucket = var.bucket_name
  tags   = var.tags
}

resource "aws_s3_bucket_website_configuration" "tienda_website" {
  bucket = aws_s3_bucket.tienda.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

  depends_on = [aws_s3_bucket.tienda]
}

resource "aws_s3_bucket_public_access_block" "no_block_public_access" {
  bucket = aws_s3_bucket.tienda.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.tienda.id

  depends_on = [aws_s3_bucket_public_access_block.no_block_public_access]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.tienda.arn}/*"
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.tienda.bucket
}

output "website_url" {
  value = aws_s3_bucket_website_configuration.tienda_website.website_endpoint
}



