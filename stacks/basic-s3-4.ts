import * as cdk from '@aws-cdk/core';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket named source-bucket
    new cdk.CfnBucket(this, 'source-bucket', {
      bucketName: 'source-bucket'
    });
    
    // Create S3 bucket named destination-bucket
    new cdk.CfnBucket(this, 'destination-bucket', {
      bucketName: 'destination-bucket'
    });
  }
}