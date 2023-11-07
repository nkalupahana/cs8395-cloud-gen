# Importing the boto3 library 
import boto3

# Set up the DynamoDB client
dynamodb = boto3.client('dynamodb')

# Defining the table name 
table_name = 'my_dynamo_table'

# Retrieve a single item from the table 
response = dynamodb.get_item(
    TableName=table_name,
    Key={
        'primary_key': {'S': '12345'}
    }
)

# Retrieve all items from the table 
response = dynamodb.scan(
    TableName=table_name
)

# Add an item to the table 
response = dynamodb.put_item(
    TableName=table_name,
    Item={
        'primary_key': {'S': '12345'},
        'data': {'S': 'My Data'}
    }
)
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
import boto3

# Get the resource
sqs = boto3.resource('sqs')

# Get the queue
queue = sqs.get_queue_by_name(QueueName='MyQueue')

# Process messages by printing out body and optional author name
for message in queue.receive_messages():
    # Print out the body of the message
    print(message.body)

    # Get the custom author message attribute if it was set
    author_text = ''
    if message.message_attributes is not None:
        author_name = message.message_attributes.get('Author').get('StringValue')
        if author_name:
            author_text = ' ({0})'.format(author_name)

    # Print out the author (if set)
    print('{0}{1}'.format(message.body, author_text))

    # Let the queue know that the message is processed
    message.delete()