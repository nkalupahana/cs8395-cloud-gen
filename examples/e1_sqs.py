import boto3

sqs = boto3.client('sqs', region_name='us-west-2')

queue_name = 'my_cool_queue'
queue_url = sqs.get_queue_url(QueueName=queue_name)['QueueUrl']

# Message to be sent
message_body = 'Hello, this is a test message!'

# Send the message to the SQS queue
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=message_body
)