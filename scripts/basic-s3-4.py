#This script will copy an object from one S3 bucket to another

import boto3

#Create an S3 client
s3 = boto3.client('s3')

#Source bucket and object
src_bucket = 'source-bucket'
src_object = 'source-object'

#Destination bucket and object
dest_bucket = 'destination-bucket'
dest_object = 'destination-object'

#Copy object
s3.copy_object(Bucket=dest_bucket, Key=dest_object, CopySource={'Bucket': src_bucket, 'Key': src_object})

#Confirm copy
response = s3.head_object(Bucket=dest_bucket, Key=dest_object)

if response['ContentLength'] == src_object['ContentLength']:
    print('Object copied successfully!')
else:
    print('Object copy failed!')