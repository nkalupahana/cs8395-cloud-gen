import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Create Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('./test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });

    // Create DynamoDB Table
    const table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    // Create IAM Role
    const role = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Allow Lambda Function to access DynamoDB Table
    table.grantReadWriteData(role);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();