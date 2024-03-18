import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  providers: [FileService],
  imports: [MinioClientModule],
  controllers: [FileController],
})
export class FileModule {}
