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

# Create an S3 client
s3 = boto3.client('s3')

# Upload a new file
data = open('test.txt', 'rb')
s3.upload_fileobj(data, 'my-bucket', 'test.txt')

# Download an existing file
s3.download_file('my-bucket', 'test.txt', 'test_local.txt')

# List all objects in a bucket
for obj in s3.list_objects(Bucket='my-bucket')['Contents']:
    print(obj['Key'])