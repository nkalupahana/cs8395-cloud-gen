# Import boto3
import boto3

# Set up a connection to DynamoDB
dynamodb = boto3.resource('dynamodb')

# Get the table
table = dynamodb.Table('myTable')

# Get all items in the table
all_items = table.scan()

# Print all items
print(all_items)
#import boto3 library
import boto3

#create an S3 resource
s3 = boto3.resource('s3')

#access the bucket 'my-bucket'
my_bucket = s3.Bucket('my-bucket')

#iterate through all objects in the bucket
for obj in my_bucket.objects.all():
    print(obj.key)

#upload a file from the local system to the bucket
data = open('my-file.txt', 'rb')
my_bucket.put_object(Key='my-file.txt', Body=data)

#download an object from the bucket
my_bucket.download_file('my-file.txt', 'downloaded-file.txt')
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