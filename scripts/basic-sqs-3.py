# Import boto3
import boto3

# Create SQS client
sqs = boto3.client('sqs')

# Get the queue url
queue_url = sqs.get_queue_url(QueueName='MyCoolQueue')

# Receive a message
response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=0
)

# Print out the message
message = response['Messages'][0]
print(message['Body'])