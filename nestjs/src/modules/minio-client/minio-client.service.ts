import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MinioClientService {
  private readonly bucket: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(MINIO_CONNECTION) private readonly minioClient: Client,
  ) {
    this.bucket = this.configService.get('MINIO_BUCKET');
  }

  async upload(file: Express.Multer.File, bucket: string = this.bucket) {
    const objectName = file.originalname;

    await this.minioClient.putObject(bucket, objectName, file.buffer);

    const url = await this.minioClient.presignedUrl('GET', bucket, objectName);

    return url;
  }

  remove(objetName: string, baseBucket: string = this.bucket) {
    return this.minioClient.removeObject(baseBucket, objetName);
  }
}
