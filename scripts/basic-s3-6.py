import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Upload a file to the bucket
s3.upload_file(Filename='path/to/file.txt', Bucket='my-bucket', Key='path/to/file.txt')

# List the objects in the bucket
objects = s3.list_objects(Bucket='my-bucket')
print(objects['Contents'])

# Download the file from the bucket
s3.download_file(Bucket='my-bucket', Key='path/to/file.txt', Filename='path/to/file.txt')

# Delete the object from the bucket
s3.delete_object(Bucket='my-bucket', Key='path/to/file.txt')