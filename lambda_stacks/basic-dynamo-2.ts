import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('./test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10)
    });

    // Create the DynamoDB Table
    const myTable = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Grant permissions to the Lambda to access the DynamoDB table
    myTable.grantReadWriteData(testFunction);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();