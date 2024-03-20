import { Injectable } from '@nestjs/common';

import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class FileService {
  constructor(private minioClientService: MinioClientService) {}

  async upload(files: Array<Express.Multer.File>) {
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const result = await this.minioClientService.upload(files[i]);

      urls.push(result);
    }

    return { urls };
  }

  remove(fileName: string) {
    return this.minioClientService.remove(fileName);
  }
}
