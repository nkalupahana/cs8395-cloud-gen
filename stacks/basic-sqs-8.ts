import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an SQS queue named MyQueue
    const myQueue = new sqs.Queue(this, 'MyQueue', {
      queueName: 'MyQueue'
    });
  }
}