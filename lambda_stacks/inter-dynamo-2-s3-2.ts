import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create lambda function
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: 'myTable'
      },
    });

    // Create DynamoDB Table
    const table = new dynamodb.Table(this, 'myTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    });

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'my-bucket', {});

    // Grant permissions to resources
    const lambdaToTablePolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['dynamodb:*'],
      resources: [table.tableArn]
    });
    testFunction.addToRolePolicy(lambdaToTablePolicy);
    
    const lambdaToBucketPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:*'],
      resources: [bucket.bucketArn + '/*']
    });
    testFunction.addToRolePolicy(lambdaToBucketPolicy);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();