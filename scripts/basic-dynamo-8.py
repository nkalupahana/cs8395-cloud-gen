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