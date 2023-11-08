# Import boto3 library 
import boto3 

# Create a client object 
dynamodb = boto3.client('dynamodb')

# Get the table object 
table = dynamodb.Table('my_table')

# Insert a new item into the table 
table.put_item(
   Item={
        'primary_key': 'ABC123',
        'name': 'John Smith',
        'age': 25,
        'location': 'New York'
    }
)

# Query the table 
response = table.query(
    KeyConditionExpression=Key('primary_key').eq('ABC123')
)

# Print the response 
print(response)
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