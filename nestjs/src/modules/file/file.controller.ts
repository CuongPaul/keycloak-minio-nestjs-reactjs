import {
  Post,
  Query,
  Delete,
  Controller,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';

@Public()
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.upload(files);
  }

  @Delete()
  remove(@Query() query: { name: string }) {
    return this.fileService.remove(query.name);
  }
}
