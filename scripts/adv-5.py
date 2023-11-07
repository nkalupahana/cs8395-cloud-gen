# Import the boto3 library
import boto3

# Get the dynamodb resource
dynamodb_resource = boto3.resource('dynamodb')

# Get the dynamodb table
table = dynamodb_resource.Table('my_dynamodb_table')

# Perform an item query
response = table.query(
    KeyConditionExpression=Key('user_id').eq(123)
)

# Print the response
print(response)
# Import the boto3 library
import boto3

# Create an S3 client
s3 = boto3.client('s3')

# Call the S3 API to list all buckets
response = s3.list_buckets()

# Print out the bucket names
for bucket in response['Buckets']:
    print(bucket['Name'])

# Upload a file to the new bucket
s3.upload_file('/path/to/my/file.txt', 'my-new-bucket', 'file.txt')

# Download a file from the bucket
s3.download_file('my-new-bucket', 'file.txt', '/path/to/my/file.txt')

# Delete the bucket
s3.delete_bucket(Bucket='my-new-bucket')
# import boto3 library
import boto3

# create an SQS client
sqs_client = boto3.client('sqs')

# define the queue URL
queue_url = 'https://my-sqs-queue.amazon.com'

# send a message to the queue
response = sqs_client.send_message(
    QueueUrl = queue_url,
    MessageBody = 'This is my message'
)

# receive the message from the queue
response = sqs_client.receive_message(
    QueueUrl = queue_url
)

# print the message
print(response['Messages'][0]['Body'])