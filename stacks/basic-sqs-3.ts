javascript
import * as sqs from "@aws-cdk/aws-sqs";
import * as cdk from "@aws-cdk/core";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an SQS queue named MyCoolQueue
    new sqs.Queue(this, "MyCoolQueue", {
      queueName: "MyCoolQueue",
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();