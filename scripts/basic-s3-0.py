import boto3

# Connect to S3
s3 = boto3.resource('s3')

# Get a list of buckets
buckets = s3.buckets.all()

# Create a new bucket
s3.create_bucket(Bucket='my-bucket-name')

# Upload a file to the new bucket
data = open('sample_file.txt', 'rb')
s3.Object('my-bucket-name', 'sample_file.txt').put(Body=data)

# List objects in the new bucket
for obj in s3.Bucket('my-bucket-name').objects.all():
    print(obj.key)

# Download the file from the new bucket
s3.Bucket('my-bucket-name').download_file('sample_file.txt', 'downloaded_file.txt')

# Delete the bucket
s3.Bucket('my-bucket-name').delete()