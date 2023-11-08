import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: new lambda.InlineCode(`${fs.readFileSync('test.zip', { encoding: 'utf-8' })}`),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler'
    });

    // Create the DynamoDB table
    const myTable = new dynamoDb.Table(this, 'my_table', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING }
    });

    // Create the SQS Queue
    const myQueue = new sqs.Queue(this, 'my-queue');

    // Create an IAM Role
    const role = new iam.Role(this, 'my-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Give Lambda access to the resources
    role.addToPolicy(
      new iam.PolicyStatement({
        resources: [myTable.tableArn, myQueue.queueArn],
        actions: ['dynamodb:*', 'sqs:*']
      })
    );
    testFunction.addToRolePolicy(
      new iam.PolicyStatement({
        resources: [myTable.tableArn, myQueue.queueArn],
        actions: ['dynamodb:*', 'sqs:*']
      })
    );
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();