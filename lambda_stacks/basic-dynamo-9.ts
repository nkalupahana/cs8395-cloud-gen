import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create AWS Lambda Function
    const test_function = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('./test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler'
    });

    // Create IAM Role for Lambda
    const role = new iam.Role(this, 'test_function_role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Give Lambda access to DynamoDB
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:*'],
        resources: ['*']
      })
    );

    // Create DynamoDB Table
    const users = new dynamodb.Table(this, 'users', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();