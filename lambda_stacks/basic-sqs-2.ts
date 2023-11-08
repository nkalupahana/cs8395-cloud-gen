import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create a test Lambda function
        const testFunction = new lambda.Function(this, 'test_function', {
            code: lambda.Code.fromAsset('test.zip'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_10_X,
        });

        // Create an SQS queue
        const myQueue = new sqs.Queue(this, 'MyQueueName', {
            visibilityTimeout: cdk.Duration.seconds(300)
        });

        // Grant the Lambda function access to the SQS queue
        myQueue.grantSendMessages(testFunction);
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();