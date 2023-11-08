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

# Create an SQS client
sqs = boto3.client('sqs')

queue_url = sqs.get_queue_url(QueueName='MyQueueName')

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