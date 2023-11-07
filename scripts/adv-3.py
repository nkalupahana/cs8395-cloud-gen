import boto3

# Get the service resource
dynamodb = boto3.resource('dynamodb')

# Instantiate a table resource object
table = dynamodb.Table('myTable')

# Perform a query
response = table.query(
    KeyConditionExpression=Key('attribute_name').eq('some_value')
)

# Print the response
print(response)
#import boto3
import boto3

#create an s3 resource object
s3 = boto3.resource('s3')

#upload a file named 'test.txt' to the bucket
s3.Object('my-bucket', 'test.txt').put(Body=open('test.txt', 'rb'))

#list all objects in the bucket 
for obj in s3.Bucket('my-bucket').objects.all():
    print(obj.key)

#download the file to the local directory
s3.Bucket('my-bucket').download_file('test.txt', 'downloaded-test.txt')
# Import boto3
import boto3

# Create SQS client
sqs = boto3.client('sqs')

# Get the queue url
queue_url = sqs.get_queue_url(QueueName='MyCoolQueue')

# Receive a message
response = sqs.receive_message(
    QueueUrl=queue_url,
    AttributeNames=[
        'SentTimestamp'
    ],
    MaxNumberOfMessages=1,
    MessageAttributeNames=[
        'All'
    ],
    VisibilityTimeout=0,
    WaitTimeSeconds=0
)

# Print out the message
message = response['Messages'][0]
print(message['Body'])