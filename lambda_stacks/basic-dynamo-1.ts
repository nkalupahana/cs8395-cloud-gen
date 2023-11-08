import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
    });

    // Create DynamoDB
    const myTable = new dynamodb.Table(this, 'my_table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Grant DynamoDB access to Lambda
    myTable.grantReadWriteData(testFunction);

    // Grant IAM permissions to Lambda
    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });
    policyStatement.addActions("iam:Create*");
    policyStatement.addActions("iam:Delete*");
    policyStatement.addActions("iam:Get*");
    policyStatement.addActions("iam:List*");
    policyStatement.addActions("iam:Update*");
    policyStatement.addActions("iam:PassRole");
    policyStatement.addResources("*");
    testFunction.addToRolePolicy(policyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();