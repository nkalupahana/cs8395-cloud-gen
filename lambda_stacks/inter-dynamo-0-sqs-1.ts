import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset(`${__dirname}/test.zip`),
      handler: 'index.handler'
    });

    // Create the DynamoDB Table
    const myTable = new dynamoDb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING }
    });

    // Create the SQS Queue
    const myQueue = new sqs.Queue(this, 'my-sqs-queue');

    // Grant permissions to the Lambda function
    myTable.grantReadWriteData(testFunction);
    myQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();