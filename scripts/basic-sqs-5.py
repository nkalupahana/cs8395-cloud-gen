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