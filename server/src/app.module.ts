import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    QuoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
