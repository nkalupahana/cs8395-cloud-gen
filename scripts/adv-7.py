#Import boto3
import boto3

# Create DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Create table
table = dynamodb.Table("MyTable")

# Put items on table
table.put_item(
   Item={
        'my_key': 'abc123',
        'data': 'some data'
    }
)

# Get item from table
response = table.get_item(
    Key={
        'my_key': 'abc123'
    }
)
item = response['Item']
print(item)

# Update item on table
table.update_item(
    Key={
        'my_key': 'abc123'
    },
    UpdateExpression='SET data = :val1',
    ExpressionAttributeValues={
        ':val1': 'some new data'
    }
)
import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Upload a new file
s3.upload_file('/path/to/local/file.txt', 'my-bucket', 'file.txt')

# Download a file
s3.download_file('my-bucket', 'file.txt', '/path/to/local/file.txt')

# List objects in a bucket
response = s3.list_objects(Bucket='my-bucket')

# Get a specific object
object = s3.get_object(Bucket='my-bucket', Key='file.txt')

# Delete an object
s3.delete_object(Bucket='my-bucket', Key='file.txt')
import boto3

# Create an SQS resource
sqs = boto3.resource('sqs')

queue_url = sqs.get_queue_url(QueueName='My_Queue')

# Send a message to the queue
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody='Hello World!'
)

# Receive messages from the queue
messages = sqs.receive_message(
    QueueUrl=queue_url
)

# Print the body of the message
print(messages['Messages'][0]['Body'])