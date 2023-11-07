// Create an AWS CDK Stack class that creates an S3 bucket

import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new s3.Bucket(this, 'nisala', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
    }
}