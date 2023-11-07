typescript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoTable = new dynamodb.Table(this, 'my_dynamo_table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'my_dynamo_table',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}