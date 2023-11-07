import boto3

# Create connection to DynamoDB
dynamodb = boto3.resource('dynamodb')

# Get reference to users table
users_table = dynamodb.Table('users')

# Insert a new user
new_user = {
    'id': '12345',
    'name': 'John Doe',
    'age': 25    
}

users_table.put_item(Item=new_user)

# Query for users
response = users_table.query(
    KeyConditionExpression=Key('age').eq(25)
)

# Print the results
for user in response['Items']:
    print(user)