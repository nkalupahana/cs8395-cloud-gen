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