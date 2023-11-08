#!/usr/bin/env python

# import boto3 to access DynamoDB
import boto3

# create a DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# get the table called "myTable"
table = dynamodb.Table('myTable')

# put an item in the table
table.put_item(
   Item={
        'username': 'janedoe',
        'first_name': 'Jane',
        'last_name': 'Doe',
        'age': 25,
        'account_type': 'standard_user',
    }
)

# get an item from the table
response = table.get_item(
    Key={
        'username': 'janedoe',
    }
)
item = response['Item']
print(item)
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