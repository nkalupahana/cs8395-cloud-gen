#import boto3 library
import boto3

#create an S3 resource
s3 = boto3.resource('s3')

#access the bucket 'my-bucket'
my_bucket = s3.Bucket('my-bucket')

#iterate through all objects in the bucket
for obj in my_bucket.objects.all():
    print(obj.key)

#upload a file from the local system to the bucket
data = open('my-file.txt', 'rb')
my_bucket.put_object(Key='my-file.txt', Body=data)

#download an object from the bucket
my_bucket.download_file('my-file.txt', 'downloaded-file.txt')