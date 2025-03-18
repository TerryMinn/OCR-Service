import { Module } from '@nestjs/common';
import { OCRController } from './ocr.controller';
import { OcrService } from './ocr.service';

@Module({
  controllers: [OCRController],
  providers: [OcrService],
})
export class OCRModule {}
