import {
  BadRequestException,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ValidateMultipleFilesPipe } from 'src/common/pipe/validation-image.pipe';
import { OcrService } from './ocr.service';
import { Representation } from 'src/common/helper/representation.helper';
import { Response } from 'express';
import { ApiKeyGuard } from 'src/common/guard/ApiKey.guard';

@Controller('ocr')
@ApiTags('ocr')
@ApiSecurity('api-key')
export class OCRController {
  constructor(private readonly ocrService: OcrService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        passport: { type: 'string', format: 'binary' },
      },
      required: ['passport'],
    },
  })
  @Post('scan')
  @ApiConsumes('multipart/form-data')
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(FilesInterceptor('passport'))
  async scan(
    @Res() response: Response,
    @UploadedFiles(ValidateMultipleFilesPipe)
    files: Array<Express.Multer.File>,
  ) {
    try {
      let customerData = {};
      for (const file of files) {
        const data = await this.ocrService.extractText(file);
        customerData = { ...data };
      }
      return new Representation(
        'Customer scanned successfully',
        customerData,
        response,
      ).sendSingle();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
