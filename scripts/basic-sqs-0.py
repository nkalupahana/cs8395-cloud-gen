import boto3

# Connect to Amazon SQS
sqs = boto3.client('sqs', region_name='us-west-2')

# Get the queue URL
queue_url = sqs.get_queue_url(QueueName='my-queue')

# Send message to queue
sqs.send_message(QueueUrl=queue_url, MessageBody="Hello World!")

# Receive message from queue
message = sqs.receive_message(QueueUrl=queue_url)

# Print message
print(message)

# Delete message from queue
sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])