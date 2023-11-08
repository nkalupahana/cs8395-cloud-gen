import * as cdk from '@aws-cdk/core';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates DynamoDB Table
    new dynamo.Table(this, 'my_table', {
      partitionKey: {
        name: 'id',
        type: dynamo.AttributeType.STRING,
      },
    });

    // Creates SQS Queue
    new sqs.Queue(this, 'MyQueueName', {
      queueName: 'MyQueueName',
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();