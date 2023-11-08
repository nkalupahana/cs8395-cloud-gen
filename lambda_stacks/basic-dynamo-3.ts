import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import iam = require('@aws-cdk/aws-iam');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler'
    });

    // Create DynamoDB table
    const myTable = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Give Lambda access to DynamoDB
    const dynamoRole = new iam.Role(this, 'dynamoRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });
    dynamoRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['dynamodb:*'],
      resources: [myTable.tableArn]
    }));
    testFunction.addToRolePolicy(dynamoRole);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();