import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { CDKContext } from '../types';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'

export class RateManagers3Stack extends cdk.Stack{
    constructor(scope: Construct, id: string, context: CDKContext, props?: cdk.StackProps){
        super(scope, id);

        // Create s3 bucket for deployment
        const ratemanagerUIBucket = new s3.Bucket(this, `${context.appName}-bucket-${context.environment}`, {
            publicReadAccess: true,
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "error.html"
        });

        // Deployment
        new s3deployment.BucketDeployment(this, `ratemanager-deployment-bucket`, {
            sources: [s3deployment.Source.asset('../build')],
            destinationBucket: ratemanagerUIBucket
        });

        // Enable cloud front distribution
        new cloudfront.Distribution(this, 'Rate manager ui cloud front distribution', {
            defaultBehavior: {
              origin: new origins.S3Origin(ratemanagerUIBucket),
            },
          });
    }
}

