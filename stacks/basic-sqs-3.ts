typescript
import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myCoolQueue = new sqs.Queue(this, "MyCoolQueue", {
      visibilityTimeout: cdk.Duration.minutes(5)
    });
  }
}