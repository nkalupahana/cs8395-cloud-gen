import cdk = require('@aws-cdk/core');
import dynamo = require('@aws-cdk/aws-dynamodb');
import s3 = require('@aws-cdk/aws-s3');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const myTable = new dynamo.Table(this, 'my_table', {
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      tableName: 'my_table'
    });

    // S3 Bucket
    const myBucket = new s3.Bucket(this, 'my-bucket-name', {
      bucketName: 'my-bucket-name'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();