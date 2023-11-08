import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(30)
    });

    // Create DynamoDB Table
    const myTable = new dynamoDB.Table(this, 'my_table', {
      partitionKey: {
        name: 'Id',
        type: dynamoDB.AttributeType.STRING
      }
    });

    // Create S3 Bucket
    const myBucket = new s3.Bucket(this, 'my-bucket');

    // Create SQS Queue
    const myQueue = new sqs.Queue(this, 'my-sqs-queue');

    // Grant permissions to Lambda
    myTable.grantReadWriteData(testFunction);
    myBucket.grantReadWrite(testFunction);
    myQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();