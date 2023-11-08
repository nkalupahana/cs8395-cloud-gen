import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket');

    // Create DynamoDB Table
    const myTable = new dynamodb.Table(this, 'my_table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create SQS Queue
    const myQueue = new sqs.Queue(this, 'MyQueue');

    // Create Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      environment: {
        BUCKET: myBucket.bucketName
      }
    });

    // Grant Lambda permissions to access S3 bucket
    myBucket.grantReadWrite(testFunction);

    // Grant Lambda permission to access DynamoDB table
    myTable.grantReadWriteData(testFunction);

    // Grant Lambda permission to access SQS queue
    myQueue.grantSendMessages(testFunction);

  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();