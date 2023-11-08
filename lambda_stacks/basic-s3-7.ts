import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import iam = require('@aws-cdk/aws-iam');

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an S3 Bucket
        const bucket = new s3.Bucket(this, 'my-bucket');

        // Create a Lambda function
        const test_function = new lambda.Function(this, 'test_function', {
            code: new lambda.AssetCode('test.zip'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_10_X,
            role: new iam.Role(this, 'test_role', {
              assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
            })
        });

        // Grant the Lambda function access to the S3 Bucket
        bucket.grantReadWrite(test_function);
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();