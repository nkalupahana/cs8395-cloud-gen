import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 Bucket
    const bucket = new s3.Bucket(this, 'my-bucket', {
      bucketName: 'my-bucket',
    });

    // Create an SQS Queue
    const queue = new sqs.Queue(this, 'my-sqs-queue', {
      queueName: 'my-sqs-queue',
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();