import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateQuotedCommand } from '../../impl/quoted/create-quoted.command';
import { QuotedRepository } from '../../../repository/quoted.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateQuotedCommand)
export class CreateQuotedHandler
  implements ICommandHandler<CreateQuotedCommand> {
  constructor(
    private readonly repository: QuotedRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateQuotedCommand, resolve: (value?) => void) {
    Logger.log('Async CreateQuoteHandler...', 'CreateQuotedCommand');
    const {quotedDto} = command;
    const quoted = this.publisher.mergeObjectContext(
      await this.repository.createQuoted(quotedDto),
    );
    quoted.commit();
    resolve();
  }
}
