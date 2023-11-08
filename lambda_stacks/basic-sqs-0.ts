import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'TestFunction', {
      code: lambda.Code.fromAsset('./test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10)
    });

    // Create the SQS queue
    const myQueue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Allow the Lambda to access the SQS queue
    const role = testFunction.role as iam.IRole;
    role?.addToPolicy(
      new iam.PolicyStatement({
        resources: [myQueue.queueArn],
        actions: ['sqs:SendMessage']
      })
    );
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();