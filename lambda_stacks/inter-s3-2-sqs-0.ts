import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const myBucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket'
    });

    const myQueue = new sqs.Queue(this, 'MyQueue', {
      queueName: 'my-queue'
    });

    const testFunction = new lambda.Function(this, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler'
    });

    const statement = new iam.PolicyStatement({
      actions: ['s3:*', 'sqs:*'],
      resources: [myBucket.bucketArn, myQueue.queueArn]
    });
    testFunction.addToRolePolicy(statement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();