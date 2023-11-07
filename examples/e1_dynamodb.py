import boto3

session = boto3.session.Session(region_name="us-west-1")
dynamodb = session.resource('dynamodb')

table = dynamodb.Table('some-table')

# Add an item to the table
response = table.put_item(
    Item={
        'primaryKeyName': 'value1',
        'anotherAttributeName': 'value2',
    }
)