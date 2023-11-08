import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create the DynamoDB table
    const myTable = new dynamoDb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamoDb.AttributeType.STRING,
      }
    });

    // Create the SQS queue
    const myQueue = new sqs.Queue(this, 'my-queue');

    // Grant the Lambda function access to the resources
    const policyStatement = new iam.PolicyStatement();
    policyStatement.addActions(
      'dynamodb:GetItem',
      'dynamodb:PutItem',
      'sqs:SendMessage',
      'sqs:ReceiveMessage'
    );
    policyStatement.addResources(myTable.tableArn, myQueue.queueArn);
    testFunction.addToRolePolicy(policyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();