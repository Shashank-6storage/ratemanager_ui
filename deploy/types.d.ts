export type CDKContext = {
    appName: string;
    region: string;
    environment: string;
    branchName: string;
    accountNumber: string;
    vpc?: {
      id: string;
      cidr: string;
      privateSubnetIds: string[];
    };
    // baseDomain: string;
    // apiDomain: string;
    // hostedZondId: string;
    // regionalCertArn: string;
  };