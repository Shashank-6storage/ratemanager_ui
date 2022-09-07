import * as cdk from 'aws-cdk-lib';
import {CodePipeline, CodePipelineSource, ShellStep} from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
//import { RatemanagerPipeLineStages } from '../lib/setup-stages';
import { Construct } from 'constructs';
import { CDKContext } from '../types';
import { RatemanagerPipeLineStages } from './setup-stages';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RateManagerUIPipeLineStack extends cdk.Stack {
  constructor(scope: any, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const source = CodePipelineSource.connection('Shashank-6storage/ratemanager_ui',
      'develop',
      {
        connectionArn:
          "arn:aws:codestar-connections:ap-south-1:760389274302:connection/a8e210f0-f16b-42cb-b377-39ac6e5d5c76"
      });

    const synthstep = new ShellStep('Synth', {
      input: source,
      commands: [
        'npm ci',
        'npm run build'
        //'npx cdk synth'
      ]
    });

    //console.log(`env is : ${JSON.stringify(context)}`);
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: `ratemanager-frontend-cicd-pipeline`,
      synth: synthstep
    });

    const devcontext: CDKContext = {
      ...scope.node.tryGetContext('environments').find((e: any) => e.branchName === 'develop'),
      ...scope.node.tryGetContext('globals')
    }

    console.log(`printing the dev context: ${JSON.stringify(devcontext)}`);

    const devstage = pipeline.addStage(new RatemanagerPipeLineStages(this, 'ratemanager-develop', devcontext, {
      env: {
        account: devcontext.accountNumber,
        region: devcontext.region
      }
    }));
  }
}
