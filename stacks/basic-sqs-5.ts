typescript
import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "my-sqs-queue", {
      queueName: "my-sqs-queue.amazon.com",
    });
  }
}