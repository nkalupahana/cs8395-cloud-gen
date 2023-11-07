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