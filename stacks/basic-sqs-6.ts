typescript
import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";

export class MyQueueStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const queue = new sqs.Queue(this, 'MyQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
  }
}