import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the DynamoDB table
    const myTable = new dynamodb.Table(this, 'my_dynamo_table', {
      tableName: 'my_dynamo_table',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();