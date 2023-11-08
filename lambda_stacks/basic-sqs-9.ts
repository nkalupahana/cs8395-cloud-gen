import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs";
import * as iam from "@aws-cdk/aws-iam";
import * as cdk from "@aws-cdk/core";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the lambda function
    const testFunction = new lambda.Function(this, "test_function", {
      code: lambda.Code.fromAsset("test.zip"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create the SQS queue
    const specialQueue = new sqs.Queue(this, "SpecialQueue");

    // Grant the lambda function access to the queue
    specialQueue.grantSendMessages(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();