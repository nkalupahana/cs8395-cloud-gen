import boto3

# Create an SQS client
sqs = boto3.client('sqs')

queue_url = sqs.get_queue_url(QueueName='SpecialQueue')

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