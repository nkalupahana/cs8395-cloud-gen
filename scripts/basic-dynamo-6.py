import boto3

# Get the service resource
dynamodb = boto3.resource('dynamodb')

# Access the table
table = dynamodb.Table('my_table')

# Perform a scan to return all items from the table
response = table.scan()
items = response['Items']

# Print out the results
for item in items:
    print(item)