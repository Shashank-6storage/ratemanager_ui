import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CDKContext } from '../types';
import { RateManagers3Stack } from './ratemanager-s3-stack';

export class RatemanagerPipeLineStages extends cdk.Stage{
    constructor(scope: Construct, stageName: string, context: CDKContext, props?: cdk.StageProps) {
        super(scope, stageName ,props);

    const s3Stack = new RateManagers3Stack(this, stageName, context);   
    }
}