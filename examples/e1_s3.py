import boto3

s3 = boto3.client('s3')
s3.download_file('cdk-something-something', 'hello.txt', 'hello.txt')