export interface BufferedFile {
  size: number;
  encoding: string;
  mimetype: string;
  fieldname: string;
  originalname: string;
  buffer: Buffer | string;
}
