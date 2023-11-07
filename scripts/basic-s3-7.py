import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Upload a new file
s3.upload_file('/path/to/local/file.txt', 'my-bucket', 'file.txt')

# Download a file
s3.download_file('my-bucket', 'file.txt', '/path/to/local/file.txt')

# List objects in a bucket
response = s3.list_objects(Bucket='my-bucket')

# Get a specific object
object = s3.get_object(Bucket='my-bucket', Key='file.txt')

# Delete an object
s3.delete_object(Bucket='my-bucket', Key='file.txt')