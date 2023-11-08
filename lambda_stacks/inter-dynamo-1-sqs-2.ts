import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function and grant it access to the resources
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_10_X,
      role: this.createLambdaRole(),
    });

    // Create the DynamoDB table
    new dynamodb.Table(this, 'my_table', {
      tableName: 'my_table',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create the SQS queue
    const queue = new sqs.Queue(this, 'MyQueueName', {
      queueName: 'MyQueueName',
    });

    // Grant access to the resources
    testFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['dynamodb:GetItem', 'sqs:SendMessage'],
      resources: [dynamodb.Table.fromTableName(this, 'my_table', 'my_table').tableArn, queue.queueArn]
    }));
  }

  // Create the IAM role for the Lambda
  private createLambdaRole(): iam.Role {
    const role = new iam.Role(this, 'lambda_role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    return role;
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();