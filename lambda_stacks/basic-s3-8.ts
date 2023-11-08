import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import iam = require('@aws-cdk/aws-iam');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create S3 bucket
    const myBucket = new s3.Bucket(this, 'my-bucket', {
      bucketName: 'my-bucket'
    });

    // create lambda role
    const role = new iam.Role(this, 'lambdaIamRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // give lambda access to bucket
    role.addToPolicy(new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:GetObjectVersion',
        's3:PutObject',
        's3:PutObjectVersion',
        's3:DeleteObject',
        's3:DeleteObjectVersion'
      ],
      resources: [myBucket.bucketArn + '/*']
    }));

    // create lambda function
    const testFunc = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      role: role
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();