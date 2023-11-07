#Import boto3 library
import boto3

#Create SQS client
sqs = boto3.client('sqs')

#Create a queue
response = sqs.create_queue(
    QueueName='MyQueue'
)

#Retrieve the queue URL
queue_url = response['QueueUrl']

#Send a message to the queue
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody='This is my message'
)

#Receive a message from the queue
response = sqs.receive_message(
    QueueUrl=queue_url,
    MaxNumberOfMessages=1
)

#Print out the message
print(response['Messages'][0]['Body'])

#Delete the message from the queue
message_receipt_handle = response['Messages'][0]['ReceiptHandle']
sqs.delete_message(
    QueueUrl=queue_url,
    ReceiptHandle=message_receipt_handle
)