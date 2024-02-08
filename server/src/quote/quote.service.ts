import { Injectable } from '@nestjs/common';
import {
  CryptoCurrency,
  CryptoCurrencyWithQuoteEnumType,
  QuoteCurrency,
  QuoteResponse,
} from './types';
import { CreateQuoteDto } from './dto/CreateQuoteDto.dto';
import axios from 'axios';
import queryString from 'query-string';

@Injectable()
export class QuoteService {
  async createQuote(createQuoteDto: CreateQuoteDto): Promise<QuoteResponse> {
    const query = queryString.stringify({
      symbol: createQuoteDto.base_currency,
      convert: createQuoteDto.quote_currency,
    });

    try {
      const response = await axios.get(`${process.env.API_QUOTE_URL}${query}`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
      });
      return {
        ...createQuoteDto,
        quote_amount: this.calculateQuoteAmount(
          response.data.quote_amount,
          createQuoteDto.quote_currency,
        ),
      };
    } catch (e) {
      console.log(e);
    }
  }

  private calculateQuoteAmount(
    baseAmount: number,
    baseCurrency: CryptoCurrencyWithQuoteEnumType,
  ): number {
    if (Object.values(QuoteCurrency).includes(baseCurrency as QuoteCurrency)) {
      return baseAmount;
    }
    if (
      Object.values(CryptoCurrency).includes(baseCurrency as CryptoCurrency)
    ) {
      return baseAmount;
    }
    return 0;
  }
}
