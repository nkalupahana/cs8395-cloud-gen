import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    const test_function = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('./test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
    });

    // Create the S3 bucket
    const my_bucket = new s3.Bucket(this, 'my-bucket');

    // Create the IAM Role
    const role = new iam.Role(this, 'test_role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Attach the policy to the role
    role.addToPolicy(new iam.PolicyStatement({
      actions: ['s3:*', 'dynamodb:*'],
      resources: [my_bucket.bucketArn, '*']
    }));

    // Attach the role to the Lambda
    test_function.role = role;

    // Create the DynamoDB table
    const my_table = new dynamodb.Table(this, 'my_table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();