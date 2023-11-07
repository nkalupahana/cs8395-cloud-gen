import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Upload a new file
data = open('test.txt', 'rb')
s3.upload_fileobj(data, 'my-bucket', 'test.txt')

# Download an existing file
s3.download_file('my-bucket', 'test.txt', 'test_local.txt')

# List all objects in a bucket
for obj in s3.list_objects(Bucket='my-bucket')['Contents']:
    print(obj['Key'])