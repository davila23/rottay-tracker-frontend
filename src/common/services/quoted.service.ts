import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { QuotedIdRequestParamsDto } from '../dtos/quoted.dto';
import { QuotedDto } from '../dtos/quoted.dto';
import { CreateQuotedCommand } from '../commands/impl/quoted/create-quoted.command';
import { UpdateQuotedCommand } from '../commands/impl/quoted/update-quoted.command';
import { DeleteQuotedCommand } from '../commands/impl/quoted/delete-quoted.command';

@Injectable()
export class QuotedService {
  constructor(private readonly commandBus: CommandBus) {}

  async createQuoted(quoted: QuotedDto) {
    return await this.commandBus.execute(
      new CreateQuotedCommand(quoted),
    );
  }

  async updateQuoted(quoted: QuotedDto) {
    return await this.commandBus.execute(
      new UpdateQuotedCommand(quoted),
    );
  }

  async deleteQuoted(quoted: QuotedIdRequestParamsDto) {
    return await this.commandBus.execute(
      new DeleteQuotedCommand(quoted),
    );
  }

  async findQuoted() {
    // TODO
  }
}
