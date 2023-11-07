#Import boto3
import boto3

# Create DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Create table
table = dynamodb.create_table(
    TableName='MyTable',
    KeySchema=[
        {
            'AttributeName': 'my_key',
            'KeyType': 'HASH'
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'my_key',
            'AttributeType': 'S'
        }
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

# Wait until table exists
table.meta.client.get_waiter('table_exists').wait(TableName='MyTable')

# Put items on table
table.put_item(
   Item={
        'my_key': 'abc123',
        'data': 'some data'
    }
)

# Get item from table
response = table.get_item(
    Key={
        'my_key': 'abc123'
    }
)
item = response['Item']
print(item)

# Update item on table
table.update_item(
    Key={
        'my_key': 'abc123'
    },
    UpdateExpression='SET data = :val1',
    ExpressionAttributeValues={
        ':val1': 'some new data'
    }
)

# Delete table
table.delete()