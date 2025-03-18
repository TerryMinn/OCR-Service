import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OCRModule } from './module/ocr_module/ocr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    OCRModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
