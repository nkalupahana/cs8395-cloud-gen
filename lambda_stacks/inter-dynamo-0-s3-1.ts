import { Stack, App, Duration } from "@aws-cdk/core";
import { CfnOutput, Function, Code, CfnTable, Bucket } from '@aws-cdk/aws-lambda';
import { PolicyStatement, Effect, Policy } from '@aws-cdk/aws-iam';

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const testFunction = new Function(this, 'testFunction', {
      code: Code.fromAsset('./test.zip'),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_12_X,
      timeout: Duration.seconds(60),
    });

    // Create the DynamoDB table
    const table = new CfnTable(this, 'MyTable', {
      tableName: 'MyTable',
      keySchema: [
        {
          attributeName: 'id',
          keyType: 'HASH'
        }
      ],
      attributeDefinitions: [
        {
          attributeName: 'id',
          attributeType: 'S'
        }
      ],
      billingMode: 'PAY_PER_REQUEST',
      timeToLiveSpecification: {
        enabled: false
      }
    });

    // Create the S3 bucket
    const bucket = new Bucket(this, 'my-bucket', {
      versioned: true
    });

    // Allow Lambda to access the DynamoDB table
    const ddbPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [table.attrArn],
      actions: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:DeleteItem', 'dynamodb:Scan', 'dynamodb:Query']
    });
    const policy = new Policy(this, 'ddbPolicy', {
      statements: [ddbPolicy]
    });
    policy.attachToRole(testFunction.role!);

    // Allow Lambda to access the S3 bucket
    const s3Policy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [bucket.bucketArn + '/*'],
      actions: ['s3:*']
    });
    const s3BucketPolicy = new Policy(this, 's3Policy', {
      statements: [s3Policy]
    });
    s3BucketPolicy.attachToRole(testFunction.role!);

    // Export the ARNs
    new CfnOutput(this, 'LambdaArn', {
      value: testFunction.functionArn
    });
    new CfnOutput(this, 'TableArn', {
      value: table.attrArn
    });
    new CfnOutput(this, 'BucketArn', {
      value: bucket.bucketArn
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();