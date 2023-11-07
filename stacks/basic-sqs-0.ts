typescript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myQueue = new sqs.Queue(this, 'MyQueue', {
      queueName: 'my-queue'
    });
  }
}