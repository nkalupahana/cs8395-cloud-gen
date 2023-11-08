import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the S3 bucket
    const myBucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket'
    });

    // Create the IAM role
    const lambdaRole = new iam.Role(this, 'LambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Grant S3 access to the IAM role
    lambdaRole.addToPolicy(
      new iam.PolicyStatement({
        resources: [myBucket.bucketArn],
        actions: ['s3:*']
      })
    );

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'TestFunction', {
      code: lambda.Code.fromAsset('./test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      role: lambdaRole
    });

    // Grant access to the S3 bucket
    myBucket.grantReadWrite(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();