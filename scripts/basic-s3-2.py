import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Create a bucket
s3.create_bucket(Bucket='my-bucket')

# Upload a file
s3.upload_file(Filename='/path/to/myfile.txt', Bucket='my-bucket', Key='myfile.txt')

# List the contents of a bucket
s3_list = s3.list_objects(Bucket='my-bucket')
for object in s3_list['Contents']:
    print(object['Key'])

# Download a file
s3.download_file(Filename='/path/to/downloaded/myfile.txt', Bucket='my-bucket', Key='myfile.txt')

# Delete a file
s3.delete_object(Bucket='my-bucket', Key='myfile.txt')