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