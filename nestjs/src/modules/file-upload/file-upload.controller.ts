import {
  Post,
  Controller,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { Public } from 'nest-keycloak-connect';

import { FileUploadService } from './file-upload.service';
import { BufferedFile } from '../minio-client/interfaces/buffered-file.interface';

@Public()
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('image'))
  uploadSingle(@UploadedFile() file: BufferedFile) {
    return this.fileUploadService.uploadSingle(file);
  }

  @Post('many')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ]),
  )
  async uploadMany(@UploadedFiles() files: BufferedFile) {
    return this.fileUploadService.uploadMany(files);
  }
}
