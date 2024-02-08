import {
  CryptoCurrency,
  CryptoCurrencyWithQuoteEnumValues,
  QuoteCurrency,
} from '../types';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  base_amount: number;

  @IsEnum(CryptoCurrencyWithQuoteEnumValues)
  base_currency: CryptoCurrency;

  @IsEnum(CryptoCurrencyWithQuoteEnumValues)
  quote_currency: QuoteCurrency;
}
