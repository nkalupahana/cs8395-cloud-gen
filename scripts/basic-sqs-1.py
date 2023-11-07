import boto3

# Accessing SQS queue
sqs = boto3.resource('sqs', region_name='my-region')
queue = sqs.get_queue_by_name(QueueName='my-sqs-queue')

# Retrieving messages
for message in queue.receive_messages(MaxNumberOfMessages=10):
    print(message.body)
    message.delete() # Deletes message from queue