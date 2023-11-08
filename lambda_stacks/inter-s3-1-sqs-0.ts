import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket');

    // Create SQS queue
    const myQueue = new sqs.Queue(this, 'my-queue');

    // Create IAM Role for Lambda
    const role = new iam.Role(this, 'test-function-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Grant access to S3 bucket
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [myBucket.bucketArn + '/*']
    }));

    // Grant access to SQS queue
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['sqs:SendMessage'],
      resources: [myQueue.queueArn]
    }));

    // Create Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      role: role
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();