import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from "@aws-cdk/aws-iam";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an SQS Queue
    const queue = new sqs.Queue(this, 'My_Queue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    // Create a Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      timeout: cdk.Duration.seconds(30)
    });

    // Grant the Lambda function permission to access the SQS Queue
    const lambda_role = testFunction.role as iam.Role
    queue.grantConsumeMessages(lambda_role);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();