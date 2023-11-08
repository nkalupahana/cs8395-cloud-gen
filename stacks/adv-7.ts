import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
 constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
   super(scope, id, props);

   // Create DynamoDB Table
   const myTable = new dynamodb.Table(this, 'MyTable', {
     tableName: 'MyTable',
     partitionKey: {
       name: 'id',
       type: dynamodb.AttributeType.STRING
     }
   });

   // Create S3 Bucket
   const myBucket = new s3.Bucket(this, 'my-bucket', {
     bucketName: 'my-bucket'
   });

   // Create SQS Queue
   const myQueue = new sqs.Queue(this, 'My_Queue', {
     queueName: 'My_Queue'
   });
 }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();