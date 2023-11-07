typescript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';

export class MyCDKStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myQueueName = new sqs.Queue(this, 'MyQueueName', {
      queueName: 'MyQueueName',
    });
  }
}