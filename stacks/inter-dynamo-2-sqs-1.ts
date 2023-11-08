import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB table
    const myTable = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'name',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // SQS queue
    const mySqsQueue = new sqs.Queue(this, 'my-sqs-queue');
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();