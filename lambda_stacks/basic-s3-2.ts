import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'my-bucket');

    // Create Lambda function
    const test_lambda = new lambda.Function(this, 'test_function', {
      code: new lambda.AssetCode('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create IAM Role
    const role = new iam.Role(this, 'lambda_role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // Grant S3 access to Lambda
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [bucket.arnForObjects('*')],
      })
    );
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();