import { App, Stack } from '@aws-cdk/core';
import { Function, Code, Runtime, StartingPosition } from '@aws-cdk/aws-lambda';
import { Table, StreamViewType, BillingMode } from '@aws-cdk/aws-dynamodb';
import { Bucket } from '@aws-cdk/aws-s3';

export class CdkStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    // Create an S3 bucket
    const bucket = new Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket-name'
    });

    // Create a DynamoDB table
    const table = new Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
      billingMode: BillingMode.PAY_PER_REQUEST
    });

    // Create a Lambda function
    const fn = new Function(this, 'test_function', {
      code: Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      startingPosition: StartingPosition.TRIM_HORIZON
    });

    // Grant Lambda access to DynamoDB table
    table.grantReadWriteData(fn);

    // Grant Lambda access to S3 bucket
    bucket.grantReadWrite(fn);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();