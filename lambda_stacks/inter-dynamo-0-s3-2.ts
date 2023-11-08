import { Stack } from "@aws-cdk/core";
import { Function, Code, Runtime, S3Code } from "@aws-cdk/aws-lambda";
import { Table, AttributeType, StreamViewType } from "@aws-cdk/aws-dynamodb";
import { Bucket } from "@aws-cdk/aws-s3";

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new Table(this, "MyTable", {
      partitionKey: { name: "id", type: AttributeType.STRING },
      stream: StreamViewType.NEW_AND_OLD_IMAGES
    });

    // Create S3 bucket
    const bucket = new Bucket(this, "my-bucket");

    // Create Lambda function
    const testFunction = new Function(this, "test_function", {
      code: Code.fromAsset("test.zip"),
      runtime: Runtime.NODEJS_12_X,
      handler: "index.handler"
    });

    // Grant Lambda function access to DynamoDB table and S3 bucket
    testFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["dynamodb:GetItem", "dynamodb:PutItem"],
        resources: [table.tableArn]
      })
    );
    testFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["s3:PutObject", "s3:GetObject"],
        resources: [bucket.bucketArn + "/*"]
      })
    );
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();