import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import dynamoDB = require('@aws-cdk/aws-dynamodb');
import sqs = require('@aws-cdk/aws-sqs');
import iam = require('@aws-cdk/aws-iam');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });

    // Create DynamoDB table
    const myTable = new dynamoDB.Table(this, 'my_table', {
      partitionKey: {
        name: 'ID',
        type: dynamoDB.AttributeType.STRING
      }
    });

    // Create SQS queue
    const mySqsQueue = new sqs.Queue(this, 'my-sqs-queue');

    // Give Lambda function access to resources
    const statement = new iam.PolicyStatement();
    statement.addActions('dynamodb:GetItem');
    statement.addResources(myTable.tableArn);
    statement.addActions('sqs:ReceiveMessage');
    statement.addResources(mySqsQueue.queueArn);
    testFunction.addToRolePolicy(statement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();