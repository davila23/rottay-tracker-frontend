import { ICommand } from '@nestjs/cqrs';
import { QuotedIdRequestParamsDto } from '../../../dtos/quoted.dto';

export class DeleteQuotedCommand implements ICommand {
  constructor(
    public readonly quotedDto: QuotedIdRequestParamsDto,
  ) {}
}
