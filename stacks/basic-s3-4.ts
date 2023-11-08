import core = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

export class CdkStack extends core.Stack {
    constructor(scope: core.App, id: string, props?: core.StackProps) {
        super(scope, id, props);

        // Create S3 bucket named source-bucket
        const sourceBucket = new s3.Bucket(this, 'source-bucket', {
            bucketName: 'source-bucket'
        });

        // Create S3 bucket named destination-bucket
        const destinationBucket = new s3.Bucket(this, 'destination-bucket', {
            bucketName: 'destination-bucket'
        });
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();