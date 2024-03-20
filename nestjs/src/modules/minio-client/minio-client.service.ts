import { ConfigService } from '@nestjs/config';
import { MinioClient, MinioService } from 'nestjs-minio-client';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class MinioClientService {
  private readonly port: number;
  private readonly bucket: string;
  private readonly endpoint: string;
  private readonly client: MinioClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly minioClientService: MinioService,
  ) {
    this.client = this.minioClientService.client;
    this.port = this.configService.get('MINIO_PORT');
    this.bucket = this.configService.get('MINIO_BUCKET');
    this.endpoint = this.configService.get('MINIO_ENDPOINT');

    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: [
            's3:ListBucket',
            's3:GetBucketLocation',
            's3:ListBucketMultipartUploads',
          ],
          Resource: ['arn:aws:s3:::bucket-demo'],
        },
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: [
            's3:GetObject',
            's3:PutObject',
            's3:DeleteObject',
            's3:AbortMultipartUpload',
            's3:ListMultipartUploadParts',
          ],
          Resource: ['arn:aws:s3:::bucket-demo/*'],
        },
      ],
    };

    this.client.setBucketPolicy(this.bucket, JSON.stringify(policy));
  }

  upload(file: Express.Multer.File, bucket: string = this.bucket) {
    this.client.putObject(bucket, file.originalname, file.buffer, (err) => {
      if (err)
        throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    });

    return `${this.endpoint}:${this.port}/${this.bucket}/${file.originalname}`;
  }

  remove(objetName: string, baseBucket: string = this.bucket) {
    return this.client.removeObject(baseBucket, objetName);
  }
}
