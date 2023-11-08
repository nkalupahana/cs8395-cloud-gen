import cdk = require('@aws-cdk/core');
import { Table, AttributeType, StreamViewType, TableProps } from '@aws-cdk/aws-dynamodb';
import { Queue } from '@aws-cdk/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const tableProps: TableProps = {
      tableName: 'my_table',
      partitionKey: {
        name: 'key',
        type: AttributeType.STRING
      },
      stream: StreamViewType.NEW_IMAGE
    };

    new Table(this, 'MyTable', tableProps);
    new Queue(this, 'MyQueue', { queueName: 'my-queue' });
  }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();