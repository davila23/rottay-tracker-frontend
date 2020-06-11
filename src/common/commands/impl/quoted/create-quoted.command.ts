import { ICommand } from '@nestjs/cqrs';
import { QuotedDto } from '../../../dtos/quoted.dto';

export class CreateQuotedCommand implements ICommand {
  constructor(
    public readonly quotedDto: QuotedDto,
  ) {}
}
