import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create DynamoDB Table
        const myTable = new dynamodb.Table(this, 'my_table', {
            partitionKey: {
                name: 'id',
                type: dynamodb.AttributeType.STRING
            }
        });

        // Create SQS Queue
        const mySqsQueue = new sqs.Queue(this, 'my-sqs-queue', {
            visibilityTimeout: cdk.Duration.seconds(300)
        });
    }
}
``

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();