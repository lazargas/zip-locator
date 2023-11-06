import * as AWS from 'aws-sdk';



AWS.config.update({
    region: 'us-east-1',
    endpoint: 'dynamodb.us-east-1.amazonaws.com',
    accessKeyId: 'AKIA3JM54AG6LQZJX3X3',
    secretAccessKey: '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'
  });

export const dynamoDB = new AWS.DynamoDB.DocumentClient();
