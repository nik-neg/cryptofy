import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { StatusCodes } from 'http-status-codes';
import { QuoteModule } from './quote.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { HttpModule } from '@nestjs/axios';

describe('QuotesController', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          load: [configuration],
        }),
        QuoteModule,
      ],
      controllers: [QuoteController],
      providers: [QuoteService],
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
          text: '/POST create quote works correctly with crypto currency as base currency',
          base_amount: 1,
          base_currency: 'BTC',
          quote_currency: 'USD',
          status: StatusCodes.CREATED,
        },
        {
          text: '/POST create quote works correctly with fiat currency as base currency',
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

          if (status === StatusCodes.CREATED) {
            expect(res.body).toHaveProperty('quote_amount');
            expect(res.body).toHaveProperty('base_amount');
            expect(res.body).toHaveProperty('base_currency');
            expect(res.body).toHaveProperty('quote_currency');
          }
        });
      });
    })();

    afterEach(async () => {
      await app.close();
    });
  });
});
