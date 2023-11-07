typescript
import cdk = require('@aws-cdk/core');
import sqs = require('@aws-cdk/aws-sqs');
 
export class MyCDKStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    new sqs.Queue(this, 'MySQSQueue', {
      queueName: 'my-sqs-queue'
    });
  }
}