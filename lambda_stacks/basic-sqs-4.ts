import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import sqs = require('@aws-cdk/aws-sqs');
import iam = require('@aws-cdk/aws-iam');

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // create the SQS queue
        const myQueue = new sqs.Queue(this, 'MyQueue', {
            visibilityTimeout: cdk.Duration.seconds(300)
        });

        // create the Lambda function
        const testFunction = new lambda.Function(this, 'test_function', {
            code: lambda.Code.fromAsset('./test.zip'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
            timeout: cdk.Duration.seconds(30)
        });

        // create a policy statement to allow the function to access the SQS queue
        const policyStatement = new iam.PolicyStatement();
        policyStatement.addActions("sqs:SendMessage");
        policyStatement.addResources(myQueue.queueArn);
        testFunction.addToRolePolicy(policyStatement);
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();