# Importing the boto3 library 
import boto3

# Set up the DynamoDB client
dynamodb = boto3.client('dynamodb')

# Defining the table name 
table_name = 'my_dynamo_table'

# Retrieve a single item from the table 
response = dynamodb.get_item(
    TableName=table_name,
    Key={
        'primary_key': {'S': '12345'}
    }
)

# Retrieve all items from the table 
response = dynamodb.scan(
    TableName=table_name
)

# Add an item to the table 
response = dynamodb.put_item(
    TableName=table_name,
    Item={
        'primary_key': {'S': '12345'},
        'data': {'S': 'My Data'}
    }
)