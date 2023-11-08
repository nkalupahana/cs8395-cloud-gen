import boto3 

# Access a DynamoDB table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('MyTable')

# Perform read/write operations on the table
table.put_item(
    Item={
        'my_key': 'my_value',
        'another_key': 'another_value'
    }
)

response = table.get_item(
    Key={
        'my_key': 'my_value'
    }
)
item = response['Item']
print(item)
import boto3

# Accessing SQS queue
sqs = boto3.resource('sqs', region_name='my-region')
queue = sqs.get_queue_by_name(QueueName='my-sqs-queue')

# Retrieving messages
for message in queue.receive_messages(MaxNumberOfMessages=10):
    print(message.body)
    message.delete() # Deletes message from queue