import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
 
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    // Create a DynamoDB table
    const myDynamoDbTable = new dynamodb.Table(this, 'my_dynamodb_table', {
      partitionKey: {
        name: 'Id',
        type: dynamodb.AttributeType.STRING
      }
    });
 
    // Create an S3 bucket
    const myNewBucket = new s3.Bucket(this, 'my-new-bucket', {
      // Bucket configuration
    });
 
    // Create an SQS queue
    const mySqsQueue = new sqs.Queue(this, 'my-sqs-queue', {
      queueName: 'my-sqs-queue.amazon.com'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();