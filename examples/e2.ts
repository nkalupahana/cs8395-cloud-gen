// Create an AWS CDK Stack class that creates an AWS Lambda function with source file e2.py

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class E2Stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFunction = new lambda.Function(this, 'E2Lambda', {
            runtime: lambda.Runtime.PYTHON_3_8,
            handler: 'handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'e2.py')),
        });
    }
}
