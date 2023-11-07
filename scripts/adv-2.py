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
import boto3

# Create an SQS client
sqs = boto3.client('sqs')

queue_url = sqs.get_queue_url(QueueName='MyQueueName')

# Send a message
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageBody='Hello World!'
)

# Receive a message
response = sqs.receive_message(
    QueueUrl=queue_url
)

# Print out the message
message = response['Messages'][0]
print(message['Body'])

# Delete the message
sqs.delete_message(
    QueueUrl=queue_url,
    ReceiptHandle=message['ReceiptHandle']
)