import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new s3.Bucket(this, 'my-bucket', {
      versioned: true
    });

    const myQueue = new sqs.Queue(this, 'MyQueueName', {
      visibilityTimeout: cdk.Duration.minutes(5)
    });

    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
    });

    const role = new iam.Role(this, 'test_function_role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    myBucket.grantReadWrite(role);
    myQueue.grantSendMessages(role);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();