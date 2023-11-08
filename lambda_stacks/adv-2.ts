import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as s3 from '@aws-cdk/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket
    const myBucket = new s3.Bucket(this, 'my-bucket');

    // DynamoDB Table
    const myTable = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // SQS Queue
    const myQueue = new sqs.Queue(this, 'MyQueueName');

    // Lambda Function
    const testFunc = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      environment: {
        BUCKET_NAME: myBucket.bucketName,
        TABLE_NAME: myTable.tableName,
        QUEUE_NAME: myQueue.queueName
      }
    });

    // IAM Role for Lambda
    testFunc.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:*', 'dynamodb:*', 'sqs:*'],
      resources: [myBucket.bucketArn, myTable.tableArn, myQueue.queueArn]
    }));
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();