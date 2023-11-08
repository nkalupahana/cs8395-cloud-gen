import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const localCode = lambda.Code.fromAsset('test.zip');

        const test_function = new lambda.Function(this, 'TestFunction', {
            code: localCode,
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: 'index.handler'
        });

        const myTable = new dynamodb.Table(this, 'MyTable', {
            tableName: 'MyTable',
            partitionKey: {
                name: 'id',
                type: dynamodb.AttributeType.STRING
            }
        });

        const policyStatement = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW
        });

        policyStatement.addActions('lambda:InvokeFunction');
        policyStatement.addResources(test_function.functionArn);
        policyStatement.addActions('dynamodb:*');
        policyStatement.addResources(myTable.tableArn);

        test_function.addToRolePolicy(policyStatement);
    }
}

import * as NOCONFLICT_CDK from '@aws-cdk/core';
const app = new NOCONFLICT_CDK.App(); new CdkStack(app, 'CdkStack'); app.synth();