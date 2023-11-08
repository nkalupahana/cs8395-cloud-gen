import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Source bucket
    const sourceBucket = new s3.Bucket(this, 'SourceBucket', {
      bucketName: 'source-bucket'
    });

    // Destination bucket
    const destinationBucket = new s3.Bucket(this, 'DestinationBucket', {
      bucketName: 'destination-bucket'
    });

    // MyQueue
    new sqs.Queue(this, 'MyQueue', {
      queueName: 'MyQueue'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();