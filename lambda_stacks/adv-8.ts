import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the resources
    const myBucket = new s3.Bucket(this, 'my-bucket');
    const myTable = new dynamo.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamo.AttributeType.STRING
      }
    });
    const myQueue = new sqs.Queue(this, 'MyQueue');

    // Create the IAM role for the Lambda
    const role = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [myBucket.bucketArn + '/*']
      })
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:PutItem', 'dynamodb:GetItem'],
        resources: [myTable.tableArn]
      })
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['sqs:SendMessage'],
        resources: [myQueue.queueArn]
      })
    );

    // Create the Lambda
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      role: role
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();