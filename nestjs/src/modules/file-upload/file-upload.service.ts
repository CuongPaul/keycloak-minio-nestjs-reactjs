import { Injectable } from '@nestjs/common';

import { MinioClientService } from '../minio-client/minio-client.service';
import { BufferedFile } from '../minio-client/interfaces/buffered-file.interface';

@Injectable()
export class FileUploadService {
  constructor(private minioService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image = await this.minioService.upload(image);

    return {
      image_url: uploaded_image.url,
      message: 'Successfully uploaded to MinIO S3',
    };
  }

  async uploadMany(files: BufferedFile) {
    const image1 = files['image1'][0];
    const uploaded_image1 = await this.minioService.upload(image1);

    const image2 = files['image2'][0];
    const uploaded_image2 = await this.minioService.upload(image2);

    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3',
    };
  }
}
