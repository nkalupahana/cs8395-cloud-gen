import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the bucket
    const bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-bucket'
    });

    // Create the S3 Client
    const s3Client = new s3.S3Client(this, 'S3Client', {
      bucket: bucket
    });

    // Create the S3 upload_file
    const s3UploadFile = new s3.S3ClientUploadFile(this, 'S3UploadFile', {
      bucket: bucket
    });

    // Create the S3 download_file
    const s3DownloadFile = new s3.S3ClientDownloadFile(this, 'S3DownloadFile', {
      bucket: bucket
    });

    // Create the S3 list_objects
    const s3ListObjects = new s3.S3ClientListObjects(this, 'S3ListObjects', {
      bucket: bucket
    });

    // Create the S3 get_object
    const s3GetObject = new s3.S3ClientGetObject(this, 'S3GetObject', {
      bucket: bucket
    });

    // Create the S3 delete_object
    const s3DeleteObject = new s3.S3ClientDeleteObject(this, 'S3DeleteObject', {
      bucket: bucket
    });
  }
}