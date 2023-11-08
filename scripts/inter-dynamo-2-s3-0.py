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

# Connect to S3
s3 = boto3.resource('s3')

# Upload a file to the new bucket
data = open('sample_file.txt', 'rb')
s3.Object('my-bucket-name', 'sample_file.txt').put(Body=data)

# List objects in the new bucket
for obj in s3.Bucket('my-bucket-name').objects.all():
    print(obj.key)

# Download the file from the new bucket
s3.Bucket('my-bucket-name').download_file('sample_file.txt', 'downloaded_file.txt')
