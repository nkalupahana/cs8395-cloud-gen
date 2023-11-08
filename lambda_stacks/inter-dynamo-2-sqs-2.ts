import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'TestFunction', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create the DynamoDB table
    const myTable = new dynamodb.Table(this, 'MyTable', {
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // Create the SQS queue
    const myQueue = new sqs.Queue(this, 'MyQueueName', {
      visibilityTimeout: cdk.Duration.minutes(5),
    });

    // Grant the Lambda function access to the resources
    myTable.grantReadWriteData(testFunction);
    myQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();