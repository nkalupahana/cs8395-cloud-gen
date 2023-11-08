import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket', {
      bucketName: 'my-bucket'
    });

    // Create DynamoDB table
    const myTable = new dynamodb.Table(this, 'myTable', {
      tableName: 'myTable',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create IAM role for Lambda
    const role = new iam.Role(this, 'TestRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:*'],
        resources: [myTable.tableArn]
      })
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: [myBucket.bucketArn]
      })
    );

    // Create Lambda function
    const testLambda = new lambda.Function(this, 'testLambda', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      role: role
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();