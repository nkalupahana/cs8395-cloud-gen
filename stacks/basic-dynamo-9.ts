typescript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const usersTable = new dynamodb.Table(this, "usersTable", {
      tableName: "users",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      readCapacity: 1,
      writeCapacity: 1
    });
  }
}