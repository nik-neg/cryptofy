import { Injectable } from '@nestjs/common';
import { CryptoCurrency, QuoteCurrency, QuoteResponse } from './types';
import { CreateQuoteDto } from './dto/CreateQuoteDto.dto';
import * as qs from 'qs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuoteService {
  private readonly configService: ConfigService;
  private readonly httpService: HttpService;
  constructor(configService: ConfigService, httpService: HttpService) {
    this.configService = configService;
    this.httpService = httpService;
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<QuoteResponse> {
    const API_QUOTE_URL = this.configService.get<string>('API_QUOTE_URL');
    const API_KEY = this.configService.get<string>('API_KEY');

    const { query, baseCurrency, quoteCurrency } =
      this.createQueryString(createQuoteDto);

    try {
      const {
        data: { data },
      } = await this.httpService
        .get(`${API_QUOTE_URL}?${query}`, {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
        })
        .toPromise();

      const { price } = data[baseCurrency]['quote'][quoteCurrency];

      return {
        ...createQuoteDto,
        quote_amount: this.calculateQuoteAmount(
          price,
          createQuoteDto.base_amount,
          createQuoteDto.base_currency,
        ),
      };
    } catch (e) {
      console.log(e);
    }
  }
  private createQueryString(
    createQuoteDto: Omit<CreateQuoteDto, 'base_amount'>,
  ) {
    const { base_currency, quote_currency } = createQuoteDto;

    // always crypto currency
    const baseCurrency =
      CryptoCurrency[base_currency] ?? CryptoCurrency[quote_currency];

    const quoteCurrency =
      QuoteCurrency[base_currency] ?? QuoteCurrency[quote_currency];

    const query = qs.stringify({
      symbol: baseCurrency,
      convert: quoteCurrency,
    });

    return {
      query,
      baseCurrency,
      quoteCurrency,
    };
  }

  private calculateQuoteAmount(
    price: number,
    baseAmount: number,
    baseCurrency: string,
  ) {
    const isBaseCrypto = CryptoCurrency[baseCurrency];
    if (isBaseCrypto) {
      return parseFloat((price * baseAmount).toFixed(2));
    }
    return baseAmount / price; // no need for now to round crypto to x decimal digits
  }
}
