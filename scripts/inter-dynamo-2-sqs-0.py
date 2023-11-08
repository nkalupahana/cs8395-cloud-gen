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

# Connect to Amazon SQS
sqs = boto3.client('sqs', region_name='us-west-2')

# Get the queue URL
queue_url = sqs.get_queue_url(QueueName='my-queue')

# Send message to queue
sqs.send_message(QueueUrl=queue_url, MessageBody="Hello World!")

# Receive message from queue
message = sqs.receive_message(QueueUrl=queue_url)

# Print message
print(message)

# Delete message from queue
sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])