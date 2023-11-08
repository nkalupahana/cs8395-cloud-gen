import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import sqs = require('@aws-cdk/aws-sqs');
import iam = require('@aws-cdk/aws-iam');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'my-bucket-name');
    const queue = new sqs.Queue(this, 'my-sqs-queue', {
      queueName: 'my-sqs-queue',
      region: 'my-region'
    });

    const role = new iam.Role(this, 'function-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: [bucket.bucketArn]
      })
    );

    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['sqs:*'],
        resources: [queue.queueArn]
      })
    );

    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      role: role
    });

    bucket.grantReadWrite(testFunction);
    queue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();