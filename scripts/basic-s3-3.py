#import boto3
import boto3

#create an s3 resource object
s3 = boto3.resource('s3')

#create a bucket called 'my-bucket'
s3.create_bucket(Bucket='my-bucket')

#upload a file named 'test.txt' to the bucket
s3.Object('my-bucket', 'test.txt').put(Body=open('test.txt', 'rb'))

#list all objects in the bucket 
for obj in s3.Bucket('my-bucket').objects.all():
    print(obj.key)

#download the file to the local directory
s3.Bucket('my-bucket').download_file('test.txt', 'downloaded-test.txt')