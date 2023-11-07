import boto3

# Create an SQS client
sqs = boto3.client('sqs')

# Create a queue
response = sqs.create_queue(
    QueueName='MyQueueName'
)

# Get the queue URL
queue_url = response['QueueUrl']

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