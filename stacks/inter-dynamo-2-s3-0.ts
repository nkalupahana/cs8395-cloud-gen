import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates a DynamoDB Table
    const myTable = new dynamodb.Table(this, 'myTable', {
      tableName: 'myTable',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Creates an S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket-name', {
      bucketName: 'my-bucket-name'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();