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

# Upload a file
s3.upload_file(Filename='/path/to/myfile.txt', Bucket='my-bucket', Key='myfile.txt')

# List the contents of a bucket
s3_list = s3.list_objects(Bucket='my-bucket')
for object in s3_list['Contents']:
    print(object['Key'])

# Download a file
s3.download_file(Filename='/path/to/downloaded/myfile.txt', Bucket='my-bucket', Key='myfile.txt')

# Delete a file
s3.delete_object(Bucket='my-bucket', Key='myfile.txt')