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
      handler: 'test.handler',
      runtime: lambda.Runtime.NODEJS_12_X
    });

    // Create SQS queue
    const mySqsQueue = new sqs.Queue(this, 'MySqsQueue', {
      queueName: 'my-sqs-queue.amazon.com'
    });

    // Grant permission to the Lambda to access SQS
    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['sqs:SendMessage', 'sqs:ReceiveMessage'],
      resources: [mySqsQueue.queueArn]
    });
    testFunction.addToRolePolicy(policyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();