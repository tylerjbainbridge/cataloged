import AWS from 'aws-sdk';
import { FileWithPath } from 'file-selector';

export interface SpecialFile extends FileWithPath {
  id: string;
}

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:8d3a5c0c-56b7-4700-9814-5bbc6a2c1e2e',
});

const s3 = new AWS.S3();

export const uploadFile = (file: SpecialFile) =>
  new Promise((resolve, reject) => {
    var params = {
      Key: file.id + file.name,
      ContentType: file.type,
      Body: file,
      Bucket: 'collections-file-storage',
    };

    return s3
      .upload(params)
      .send((err: any, data: any) => (err ? reject(err) : resolve(data)));
  });
