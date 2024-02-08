import {
  CryptoCurrencyWithQuoteEnum,
  CryptoCurrencyWithQuoteEnumType,
} from '../types';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  base_amount: number;

  @IsEnum(CryptoCurrencyWithQuoteEnum)
  base_currency: CryptoCurrencyWithQuoteEnumType;

  @IsEnum(CryptoCurrencyWithQuoteEnum)
  quote_currency: CryptoCurrencyWithQuoteEnumType;
}
