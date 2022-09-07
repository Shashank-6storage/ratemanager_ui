#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RateManagerUIPipeLineStack } from '../lib/ratemanager-ui-pipeline-stack';
import * as git from 'git-branch';
import { CDKContext } from '../types';
import GitBranch = require('git-branch');

// Get CDK Context based on git branch
export const getContext = async (app: cdk.App) => {
  try {
    const currentBranch = await GitBranch();
    console.log(currentBranch);

    const environment = app.node.tryGetContext('environments').find((e: any) => e.branchName === currentBranch);

    const globals = app.node.tryGetContext('globals');

    return { ...globals, ...environment };
  } catch (error) {
    console.error(error);
  }
};

const app = new cdk.App();
const context: CDKContext = {
  ...app.node.tryGetContext('environments').find((e: any) => e.branchName === 'develop'),
  ...app.node.tryGetContext('globals')
}

new RateManagerUIPipeLineStack(app, 'ratemanager-pipeline-stack', {
  env: {
      account: '760389274302',
      region: 'ap-south-1'
  }
});

app.synth();

