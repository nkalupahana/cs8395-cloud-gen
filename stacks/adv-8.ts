import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    new s3.Bucket(this, 'my-bucket');

    // Create a DynamoDB table
    new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create an SQS queue
    new sqs.Queue(this, 'MyQueue');
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();