import {
  CryptoAndFiatCurrencyEnum,
  CryptoAndFiatCurrencyEnumType,
} from '../types';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  base_amount: number;

  @ApiProperty()
  @IsEnum(CryptoAndFiatCurrencyEnum)
  base_currency: CryptoAndFiatCurrencyEnumType;

  @ApiProperty()
  @IsEnum(CryptoAndFiatCurrencyEnum)
  quote_currency: CryptoAndFiatCurrencyEnumType;
}
