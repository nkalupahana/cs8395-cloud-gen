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