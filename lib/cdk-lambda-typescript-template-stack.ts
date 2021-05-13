import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda-nodejs');
import cdk = require('@aws-cdk/core');


export class CdkLambdaTypescriptTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create lambda function
//    const testFunc = new lambda.NodejsFunction(this, "test-func");

    const testFunc = new lambda.NodejsFunction(this, 'TestFunction', {
      entry: 'src/index.ts', // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler'
    });

    // create Event Bridge Trigger to fire testFunc
    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.expression('rate(5 minutes)')
    });
    rule.addTarget(new targets.LambdaFunction(testFunc));
  }
}
