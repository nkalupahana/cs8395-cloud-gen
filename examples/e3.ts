/*
Create an AWS CDK Stack class that creates 
(1) an AWS Lambda function with source file e2.py,
(2) an S3 bucket named nisala.

Make it so the Lambda can access the S3 bucket.
*/

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create S3 bucket
        const bucket = new s3.Bucket(this, 'nisala', {
            bucketName: 'nisala',
        });

        // Create IAM role for Lambda function
        const role = new iam.Role(this, 'LambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        });

        // Allow Lambda function to access S3 bucket
        bucket.grantReadWrite(role);

        // Create Lambda function
        const lambdaFn = new lambda.Function(this, 'MyLambda', {
            runtime: lambda.Runtime.PYTHON_3_8,
            handler: 'e2.handler',
            code: lambda.Code.fromAsset('e2.py'),
            role,
            environment: {
                BUCKET_NAME: bucket.bucketName,
            },
        });
    }
}
