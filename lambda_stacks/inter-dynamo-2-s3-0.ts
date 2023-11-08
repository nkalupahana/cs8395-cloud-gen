import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'my-bucket-name', {
      bucketName: 'my-bucket-name'
    });

    // Create DynamoDB table
    const table = new dynamoDB.Table(this, 'myTable', {
      partitionKey: { name: 'id', type: dynamoDB.AttributeType.STRING },
      tableName: 'myTable'
    });

    // Create IAM role
    const role = new iam.Role(this, 'LambdaExecRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    // Grant permissions to role
    bucket.grantReadWrite(role);
    table.grantReadWriteData(role);

    // Create Lambda function
    const func = new lambda.Function(this, 'test_function', {
      code: new lambda.AssetCode('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      role
    });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();