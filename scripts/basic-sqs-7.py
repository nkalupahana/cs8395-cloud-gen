import boto3

# Create an SQS resource
sqs = boto3.resource('sqs')

# Create a queue
queue = sqs.create_queue(
    QueueName='My_Queue'
)

# Get the URL of the queue
queue_url = queue.url

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