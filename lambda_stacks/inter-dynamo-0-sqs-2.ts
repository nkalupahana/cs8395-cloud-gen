import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Create a Lambda function
    const testFunction = new lambda.Function(this, 'TestFunction', {
        runtime: lambda.Runtime.NODEJS_12_X,
        code: lambda.Code.fromAsset('test.zip'),
        handler: 'index.handler'
    });

    // Create a DynamoDB table
    const myTable = new dynamodb.Table(this, 'MyTable', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });

    // Create an SQS queue
    const myQueueName = new sqs.Queue(this, 'MyQueueName');

    // Grant permissions to the Lambda function
    myTable.grantReadWriteData(testFunction);
    myQueueName.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();