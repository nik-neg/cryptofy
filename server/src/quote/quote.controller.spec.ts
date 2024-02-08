import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuotesController', () => {
  let app: INestApplication;
  let quotesService = { createQuote: () => {} };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: quotesService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/POST create quote', () => {
    const createQuoteDto = {
      base_amount: -1,
      base_currency: 'BTC',
      quote_currency: 'USD',
    };
    return request(app.getHttpServer())
      .post('/quote')
      .send(createQuoteDto)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
