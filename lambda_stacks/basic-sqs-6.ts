import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
    });

    // Create SQS queue
    const myQueue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Grant Lambda execution role permissions to access SQS queue
    const queuePolicyStatement = new iam.PolicyStatement({
      actions: ['sqs:SendMessage', 'sqs:ReceiveMessage'],
      resources: [myQueue.queueArn],
    });
    testFunction.role?.addToPolicy(queuePolicyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();