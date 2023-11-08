import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const myTable = new dynamodb.Table(this, 'my_table', {
      tableName: 'my_table',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });
    
    const myBucket = new s3.Bucket(this, 'my-bucket', {
      bucketName: 'my-bucket'
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();