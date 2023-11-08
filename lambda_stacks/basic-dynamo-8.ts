import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Function
    const lambdaFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create DynamoDB Table
    const table = new dynamo.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamo.AttributeType.STRING,
      },
      tableName: 'myTable',
    });

    // Allow Lambda to access DynamoDB table
    table.grantReadWriteData(lambdaFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();