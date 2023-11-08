import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: new lambda.AssetCode('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      role: new iam.Role(this, 'TestFunctionRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      }),
    });

    // DynamoDB Table
    const myTable = new dynamodb.Table(this, 'MyTable', {
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // SQS Queue
    const myQueue = new sqs.Queue(this, 'my-queue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    // Give Lambda access to resources
    testFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:*'],
        resources: [myTable.tableArn],
      })
    );

    testFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['sqs:*'],
        resources: [myQueue.queueArn],
      })
    );
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();