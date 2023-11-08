import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    const bucket = new s3.Bucket(this, 'my-bucket-name');

    // Create an SQS queue
    const queue = new sqs.Queue(this, 'my-queue');

    // Create the Lambda function
    const myLambda = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      role: new iam.Role(this, 'lambda-role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
      })
    });

    // Grant access to S3 bucket
    bucket.grantReadWrite(myLambda);

    // Grant access to SQS queue
    queue.grantSendMessages(myLambda);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();