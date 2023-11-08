import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Function
    const testFunction = new lambda.Function(this, 'test_function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('./test.zip'),
      handler: 'index.handler',
    });

    // Create DynamoDB Table
    const myTable = new dynamodb.Table(this, 'my_table', {
      tableName: 'my_table',
      partitionKey: {
        name: 'Id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // Create S3 Bucket
    const myBucket = new s3.Bucket(this, 'my-bucket', {
      bucketName: 'my-bucket',
    });

    // Create IAM Policy
    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });
    policyStatement.addActions(
      'dynamodb:GetItem',
      'dynamodb:PutItem',
      's3:GetObject',
      's3:PutObject'
    );
    policyStatement.addResources(myTable.tableArn, myBucket.bucketArn);

    // Apply Policy to Lambda
    testFunction.addToRolePolicy(policyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();