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