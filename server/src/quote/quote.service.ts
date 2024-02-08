import { Injectable } from '@nestjs/common';
import { CryptoCurrency, QuoteCurrency, QuoteResponse } from './types';
import { CreateQuoteDto } from './dto/CreateQuoteDto.dto';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class QuoteService {
  async createQuote(createQuoteDto: CreateQuoteDto): Promise<QuoteResponse> {
    const { query, baseCurrency, quoteCurrency } =
      this.createQueryString(createQuoteDto);

    try {
      const { data } = await axios.get(
        `${process.env.API_QUOTE_URL}?${query}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY,
          },
        },
      );

      const price = data.data[baseCurrency]['quote'][quoteCurrency].price;

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
    const baseCurrency = // always crypto currency
      CryptoCurrency[createQuoteDto.base_currency] ??
      CryptoCurrency[createQuoteDto.quote_currency];

    const quoteCurrency =
      QuoteCurrency[createQuoteDto.base_currency] ??
      QuoteCurrency[createQuoteDto.quote_currency];

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
    return baseAmount / price; // no need for now to round crypto to 2 decimal places
  }
}
