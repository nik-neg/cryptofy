import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { StatusCodes } from 'http-status-codes';

describe('QuotesController', () => {
  let app: INestApplication;
  // let quotesService = { createQuote: () => {} };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useClass: QuoteService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('calculateFinance DTO validation', () => {
    (() => {
      [
        {
          text: '/POST create quote fails due to negative base amount',
          base_amount: -1,
          base_currency: 'BTC',
          quote_currency: 'USD',
          status: StatusCodes.BAD_REQUEST,
        },
        {
          text: '/POST create quote fails due to wrong base currency',
          base_amount: 1,
          base_currency: 'BTC-ABC',
          quote_currency: 'USD',
          status: StatusCodes.BAD_REQUEST,
        },
        {
          text: '/POST create quote fails due to negative quote currency',
          base_amount: 1,
          base_currency: 'BTC',
          quote_currency: 'USD-BTC',
          status: StatusCodes.BAD_REQUEST,
        },
        {
          text: '/POST create quote works correctly with crypto currency',
          base_amount: 1,
          base_currency: 'BTC',
          quote_currency: 'USD',
          status: StatusCodes.CREATED,
        },
        {
          text: '/POST create quote works correctly with crypto currency',
          base_amount: 1,
          base_currency: 'USD',
          quote_currency: 'BTC',
          status: StatusCodes.CREATED,
        },
        {
          text: '/POST create quote fails due to same base and quote currency',
          base_amount: 1,
          base_currency: 'USD',
          quote_currency: 'USD',
          status: StatusCodes.BAD_REQUEST,
        },
      ].map(({ text, base_amount, base_currency, quote_currency, status }) => {
        it(text, async () => {
          const res = await request(app.getHttpServer())
            .post('/quote')
            .send({ base_amount, base_currency, quote_currency });

          expect(res.status).toBe(status);
        });
      });
    })();

    afterEach(async () => {
      await app.close();
    });
  });
});
