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