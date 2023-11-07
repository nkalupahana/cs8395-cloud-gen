# Import the boto3 library
import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Call the S3 API to list all buckets
response = s3.list_buckets()

# Print out the bucket names
for bucket in response['Buckets']:
    print(bucket['Name'])

# Create a new bucket
s3.create_bucket(Bucket='my-new-bucket')

# Upload a file to the new bucket
s3.upload_file('/path/to/my/file.txt', 'my-new-bucket', 'file.txt')

# Download a file from the bucket
s3.download_file('my-new-bucket', 'file.txt', '/path/to/my/file.txt')

# Delete the bucket
s3.delete_bucket(Bucket='my-new-bucket')