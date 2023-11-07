# Import the boto3 library
import boto3

# Get the dynamodb resource
dynamodb_resource = boto3.resource('dynamodb')

# Get the dynamodb table
table = dynamodb_resource.Table('my_dynamodb_table')

# Perform an item query
response = table.query(
    KeyConditionExpression=Key('user_id').eq(123)
)

# Print the response
print(response)