import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create resources
    const myTable = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
    const myBucket = new s3.Bucket(this, 'my-bucket');
    const myQueue = new sqs.Queue(this, 'My_Queue');

    // Create Lambda
    const testFunction = new lambda.Function(this, 'test_function', {
      code: lambda.Code.fromAsset('test.zip'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
    });

    // Grant access to resources
    const statement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
    });
    statement.addActions('dynamodb:*');
    statement.addActions('s3:*');
    statement.addActions('sqs:*');
    statement.addResources(myTable.tableArn);
    statement.addResources(myBucket.bucketArn);
    statement.addResources(myQueue.queueArn);
    testFunction.addToRolePolicy(statement);
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();