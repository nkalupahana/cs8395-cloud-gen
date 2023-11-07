ts
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class MyTableStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myTable = new dynamodb.Table(this, 'MyTable', {
      tableName: 'myTable',
      partitionKey: {
        name: 'Id',
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}