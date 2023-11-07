# infra: This is an AWS Lambda function
import boto3

def handler(event):
    # Download file from S3
    s3 = boto3.client('s3')
    s3.download_file('nisala', 'hello.txt', 'hello.txt')
    
    return {"status": 200}