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