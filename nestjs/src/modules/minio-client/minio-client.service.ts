import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { MinioClient, MinioService } from 'nestjs-minio-client';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';

import { BufferedFile } from './interfaces/buffered-file.interface';

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
  }

  public async upload(file: BufferedFile, bucket: string = this.bucket) {
    const hashedFileName = crypto
      .createHash('md5')
      .update(Date.now().toString())
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const fileName = hashedFileName + ext;

    this.client.putObject(bucket, fileName, file.buffer, (err) => {
      if (err)
        throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    });

    return {
      url: `${this.endpoint}:${this.port}/${this.bucket}/${fileName}`,
    };
  }

  async delete(objetName: string, bucket: string = this.bucket) {
    this.client.removeObjects(bucket, [objetName], (err) => {
      if (err)
        throw new HttpException(
          'Oops something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }
}
