import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as iam from "@aws-cdk/aws-iam";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFn = new lambda.Function(this, "test_function", {
      code: lambda.Code.fromAsset("test.zip"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    });
    
    // Create the DynamoDB table
    const myDynamoTable = new dynamodb.Table(this, 'my_dynamo_table', {
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING
      },
    });

    // Grant the Lambda access to the DynamoDB table
    myDynamoTable.grantReadWriteData(testFn);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();