import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Function
    const test_function = new lambda.Function(this, 'test_function', {
      functionName: 'test_function',
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
    });

    // Create DynamoDB table
    const my_dynamodb_table = new dynamodb.Table(this, 'my_dynamodb_table', {
      tableName: 'my_dynamodb_table',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // Create S3 bucket
    const my_new_bucket = new s3.Bucket(this, 'my-new-bucket', {
      bucketName: 'my-new-bucket',
    });

    // Create SQS queue
    const my_sqs_queue = new sqs.Queue(this, 'my-sqs-queue', {
      queueName: 'my-sqs-queue.amazon.com',
    });

    // Grant Lambda Function access to DynamoDB table
    my_dynamodb_table.grantReadWriteData(test_function);

    // Grant Lambda Function access to S3 bucket
    my_new_bucket.grantReadWrite(test_function);

    // Grant Lambda Function access to SQS queue
    my_sqs_queue.grantSendMessages(test_function);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();