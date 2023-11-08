import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('./test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });

    // Create S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket');

    // Create SQS queue
    const myQueue = new sqs.Queue(this, 'my-sqs-queue');

    // Grant permissions to Lambda
    myBucket.grantReadWrite(testFunction);
    myQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();