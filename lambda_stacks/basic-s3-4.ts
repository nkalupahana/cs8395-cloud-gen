import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for the source
    const sourceBucket = new s3.Bucket(this, 'source-bucket');
    // Create an S3 bucket for the destination
    const destinationBucket = new s3.Bucket(this, 'destination-bucket');

    // Create an IAM role for the Lambda to access both buckets
    const lambdaRole = new iam.Role(this, 'lambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    sourceBucket.grantReadWrite(lambdaRole);
    destinationBucket.grantReadWrite(lambdaRole);

    // Create an AWS Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      role: lambdaRole,
      runtime: lambda.Runtime.NODEJS_10_X,
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();