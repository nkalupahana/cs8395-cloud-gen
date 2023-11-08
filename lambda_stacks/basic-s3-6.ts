import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 Bucket
    const bucket = new s3.Bucket(this, 'my-bucket');

    // Create Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_8_10
    });

    // Grant Lambda Function access to S3 Bucket
    const policyStatement = new iam.PolicyStatement();
    policyStatement.addActions("s3:*");
    policyStatement.addResources(bucket.bucketArn);
    testFunction.addToRolePolicy(policyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();