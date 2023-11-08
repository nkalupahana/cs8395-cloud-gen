import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myTable = new dynamo.Table(this, 'my_table', {
      tableName: 'my_table',
      partitionKey: {
        name: 'id',
        type: dynamo.AttributeType.STRING
      }
    });

    const myBucket = new s3.Bucket(this, 'my-bucket-name', {
      bucketName: 'my-bucket-name'
    });

    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        BUCKET: myBucket.bucketName,
        TABLE: myTable.tableName
      }
    });

    const dynamoPolicyStatement = new iam.PolicyStatement({
      resources: [myTable.tableArn],
      actions: [
        'dynamodb:PutItem',
        'dynamodb:GetItem',
        'dynamodb:Scan',
        'dynamodb:DeleteItem'
      ]
    });

    const s3PolicyStatement = new iam.PolicyStatement({
      resources: [myBucket.bucketArn],
      actions: ['s3:PutObject','s3:GetObject']
    });

    testFunction.addToRolePolicy(dynamoPolicyStatement);
    testFunction.addToRolePolicy(s3PolicyStatement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();