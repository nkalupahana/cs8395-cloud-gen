import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
 
export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    new dynamodb.Table(this, 'myTable', {
      tableName: 'myTable',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
    });
  }
}
``