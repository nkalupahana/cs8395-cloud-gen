import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the S3 buckets
    const sourceBucket = new s3.Bucket(this, 'source-bucket');
    const destinationBucket = new s3.Bucket(this, 'destination-bucket');

    // Create the SQS queue
    const myQueue = new sqs.Queue(this, 'MyQueue');

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      environment: {
        BUCKET_NAME: sourceBucket.bucketName,
        QUEUE_URL: myQueue.queueUrl
      }
    });

    // Grant the Lambda function access to the S3 buckets
    sourceBucket.grantReadWrite(testFunction);
    destinationBucket.grantReadWrite(testFunction);

    // Grant the Lambda function access to the SQS queue
    myQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();