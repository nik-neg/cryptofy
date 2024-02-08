import {
  CryptoCurrencyWithQuoteEnum,
  CryptoCurrencyWithQuoteEnumType,
} from '../types';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  @IsPositive()
  base_amount: number;

  @IsEnum(CryptoCurrencyWithQuoteEnum)
  base_currency: CryptoCurrencyWithQuoteEnumType;

  @IsEnum(CryptoCurrencyWithQuoteEnum)
  quote_currency: CryptoCurrencyWithQuoteEnumType;
}
