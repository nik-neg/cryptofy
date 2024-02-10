import {
  CryptoAndFiatCurrencyEnum,
  CryptoAndFiatCurrencyEnumType,
} from '../types';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  @IsPositive()
  base_amount: number;

  @IsEnum(CryptoAndFiatCurrencyEnum)
  base_currency: CryptoAndFiatCurrencyEnumType;

  @IsEnum(CryptoAndFiatCurrencyEnum)
  quote_currency: CryptoAndFiatCurrencyEnumType;
}
