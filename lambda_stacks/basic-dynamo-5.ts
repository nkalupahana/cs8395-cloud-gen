import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Create the Lambda
    const test_function = new lambda.Function(this, 'test_function', {
        runtime: lambda.Runtime.NODEJS_10_X,
        code: lambda.Code.fromAsset('test.zip'),
        handler: 'index.handler',
    });
    
    // Create the DynamoDB Table
    const my_dynamodb_table = new dynamodb.Table(this, 'my_dynamodb_table', {
        partitionKey: {name: 'id', type: dynamodb.AttributeType.STRING}
    });

    // Create an IAM role for the Lambda to access resources
    const role = new iam.Role(this, 'test_function_role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Grant the Lambda access to the DynamoDB table
    my_dynamodb_table.grantReadWriteData(role);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();