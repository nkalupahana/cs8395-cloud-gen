import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create an S3 bucket
        const myBucketName = new s3.Bucket(this, 'MyBucketName', {
            bucketName: 'my-bucket-name'
        });

        // Create an SQS queue
        const myQueue = new sqs.Queue(this, 'MyQueue', {
            queueName: 'my-queue'
        });
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();