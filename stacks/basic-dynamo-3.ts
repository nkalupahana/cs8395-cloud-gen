import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a DynamoDB table
    const myTable = new dynamodb.Table(this, 'MyTable', {
      partitionKey: {
        name: 'Id',
        type: dynamodb.AttributeType.STRING
      },
      tableName: 'myTable'
    });
  }
}