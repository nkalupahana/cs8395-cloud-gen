import boto3

# Create an SQS client
sqs = boto3.client('sqs')

# Create an queue called 'MyQueue'
response = sqs.create_queue(
    QueueName='MyQueue'
)

# Get queue URL
queue_url = response['QueueUrl']

# Send a message to 'MyQueue'
response = sqs.send_message(
    QueueUrl=queue_url,
    DelaySeconds=10,
    MessageAttributes={
        'Title': {
            'DataType': 'String',
            'StringValue': 'MyMessage'
        },
        'Author': {
            'DataType': 'String',
            'StringValue': 'John Doe'
        }
    },
    MessageBody=(
        'This is a test message'
    )
)

# Receive messages from 'MyQueue'
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

# Print out message data
message = response['Messages'][0]
print(message['Body']) 
print(message['MessageAttributes'])