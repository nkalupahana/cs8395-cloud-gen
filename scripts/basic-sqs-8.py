#import boto3
import boto3

#create an sqs resource
sqs = boto3.resource('sqs', region_name='us-east-1')

#get the queue named 'MyQueue'
queue = sqs.get_queue_by_name(QueueName='MyQueue')

#print the attributes of the queue
print(queue.attributes)

#send a message to the queue
response = queue.send_message(MessageBody='Hello, World.')

#receive the message from the queue
messages = queue.receive_messages(MaxNumberOfMessages=1)

#print the message body of the received message
print(messages[0].body)