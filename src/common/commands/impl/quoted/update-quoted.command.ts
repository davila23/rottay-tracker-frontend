import { ICommand } from '@nestjs/cqrs';
import { QuotedDto } from '../../../dtos/quoted.dto';

export class UpdateQuotedCommand implements ICommand {
  constructor(
    public readonly quotedDto: QuotedDto,
  ) {}
}
