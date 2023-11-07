import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket
    const myBucket = new s3.Bucket(this, "MyBucket", {
      bucketName: "my-bucket",
    });

    // Create S3 operations
    myBucket.addToResourcePolicy(
      new s3.BucketPolicyStatement(this, "CreateBucket", {
        actions: ["s3:CreateBucket"],
        principals: [new cdk.ArnPrincipal("*")],
      })
    );

    myBucket.addToResourcePolicy(
      new s3.BucketPolicyStatement(this, "UploadFile", {
        actions: ["s3:PutObject"],
        principals: [new cdk.ArnPrincipal("*")],
      })
    );

    myBucket.addToResourcePolicy(
      new s3.BucketPolicyStatement(this, "ListObjects", {
        actions: ["s3:ListBucket"],
        principals: [new cdk.ArnPrincipal("*")],
      })
    );

    myBucket.addToResourcePolicy(
      new s3.BucketPolicyStatement(this, "DownloadFile", {
        actions: ["s3:GetObject"],
        principals: [new cdk.ArnPrincipal("*")],
      })
    );

    myBucket.addToResourcePolicy(
      new s3.BucketPolicyStatement(this, "DeleteObject", {
        actions: ["s3:DeleteObject"],
        principals: [new cdk.ArnPrincipal("*")],
      })
    );
  }
}