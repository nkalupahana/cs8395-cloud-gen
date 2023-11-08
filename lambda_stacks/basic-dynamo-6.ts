import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Create the DynamoDB table
    const myTable = new dynamodb.Table(this, 'my_table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // Grant the Lambda function access to the DynamoDB table
    const dynamoDbStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [myTable.tableArn],
      actions: ['dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem'],
    });
    testFunction.addToRolePolicy(dynamoDbStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();