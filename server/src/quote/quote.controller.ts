import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/CreateQuoteDto.dto';
import { QuoteResponse } from './types';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  createQuote(@Body() createQuoteDto: CreateQuoteDto): Promise<QuoteResponse> {
    if (createQuoteDto.base_currency === createQuoteDto.quote_currency) {
      throw new BadRequestException(
        'Base and quote currency cannot be the same',
      );
    }
    return this.quoteService.createQuote(createQuoteDto);
  }
}
