import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB Table
    const table = new dynamodb.Table(this, 'MyTable', {
      tableName: 'MyTable',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES
    });

    // Create S3 Bucket
    const bucket = new s3.Bucket(this, 'my-bucket-name', {
      bucketName: 'my-bucket-name'
    });

    // Create SQS Queue
    const queue = new sqs.Queue(this, 'my-queue', {
      queueName: 'my-queue'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();