import boto3 

# Access a DynamoDB table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('MyTable')

# Perform read/write operations on the table
table.put_item(
    Item={
        'my_key': 'my_value',
        'another_key': 'another_value'
    }
)

response = table.get_item(
    Key={
        'my_key': 'my_value'
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