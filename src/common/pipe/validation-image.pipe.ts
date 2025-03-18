import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateMultipleFilesPipe
  implements
    PipeTransform<Express.Multer.File[], Promise<Express.Multer.File[]>>
{
  async transform(files: Express.Multer.File[]) {
    if (!files) {
      return;
    }

    for (const file of files) {
      if (!this.isFileValid(file)) {
        throw new BadRequestException(
          `File type '${file.mimetype}' is not allowed or size exceeds the maximum limit of 10MB.`,
        );
      }
    }

    return files;
  }

  private isFileValid(file: Express.Multer.File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png']; // Allowed MIME types for jpg and png
    const maxSizeInBytes = 10 * 1024 * 1024; // Maximum file size (10MB in bytes)

    return allowedTypes.includes(file.mimetype) && file.size <= maxSizeInBytes;
  }
}
