import boto3

# Get the service resource
dynamodb = boto3.resource('dynamodb')

# Access the table
table = dynamodb.Table('my_table')

# Perform a scan to return all items from the table
response = table.scan()
items = response['Items']

# Print out the results
for item in items:
    print(item)
import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Upload a file to the bucket
s3.upload_file(Filename='path/to/file.txt', Bucket='my-bucket', Key='path/to/file.txt')

# List the objects in the bucket
objects = s3.list_objects(Bucket='my-bucket')
print(objects['Contents'])

# Download the file from the bucket
s3.download_file(Bucket='my-bucket', Key='path/to/file.txt', Filename='path/to/file.txt')

# Delete the object from the bucket
s3.delete_object(Bucket='my-bucket', Key='path/to/file.txt')
#Import boto3 library
import boto3

#Create SQS client
sqs = boto3.client('sqs')

queue_url = sqs.get_queue_url(QueueName='MyQueue')

#Send a message to the queue
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody='This is my message'
)

#Receive a message from the queue
response = sqs.receive_message(
    QueueUrl=queue_url,
    MaxNumberOfMessages=1
)

#Print out the message
print(response['Messages'][0]['Body'])

#Delete the message from the queue
message_receipt_handle = response['Messages'][0]['ReceiptHandle']
sqs.delete_message(
    QueueUrl=queue_url,
    ReceiptHandle=message_receipt_handle
)