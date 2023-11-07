import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myTable = new dynamodb.Table(this, 'MyTable', {
      tableName: 'MyTable',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });
  }
}

const app = new cdk.App();
new MyCdkStack(app, 'MyCdkStack');
app.synth();

// cdk synth --app "npx ts-node basic-dynamo-0.ts"  