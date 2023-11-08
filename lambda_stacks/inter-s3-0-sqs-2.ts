import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'my-bucket-name');

    // Create SQS queue
    const queue = new sqs.Queue(this, 'MyQueueName');

    // Create Lambda function
    const func = new lambda.Function(this, 'test_function', {
      code: new lambda.AssetCode('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    // Grant Lambda function access to S3 bucket
    const bucketPolicyStatement = new iam.PolicyStatement({
      actions: ['s3:*'],
      resources: [bucket.bucketArn],
    });
    func.addToRolePolicy(bucketPolicyStatement);

    // Grant Lambda function access to SQS queue
    const queuePolicyStatement = new iam.PolicyStatement({
      actions: ['sqs:*'],
      resources: [queue.queueArn],
    });
    func.addToRolePolicy(queuePolicyStatement);

  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();