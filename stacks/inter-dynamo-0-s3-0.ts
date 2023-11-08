import cdk = require('@aws-cdk/core');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import s3 = require('@aws-cdk/aws-s3');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a DynamoDB table
    const dynamoTable = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'Id', type: dynamodb.AttributeType.STRING },
      tableName: 'MyTable'
    });

    // Create an S3 bucket
    const s3Bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket-name'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();