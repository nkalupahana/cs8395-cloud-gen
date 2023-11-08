import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
    });

    // Create DynamoDB Table
    const myTable = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create SQS Queue
    const mySqsQueue = new sqs.Queue(this, 'my-sqs-queue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Grant Lambda permission to access both resources
    myTable.grantReadWriteData(testFunction);
    mySqsQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();