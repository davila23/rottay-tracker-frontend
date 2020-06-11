import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteQuotedCommand } from '../../impl/quoted/delete-quoted.command';
import { QuotedRepository } from '../../../repository/quoted.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(DeleteQuotedCommand)
export class DeleteQuotedHandler
  implements ICommandHandler<DeleteQuotedCommand> {
  constructor(
    private readonly repository: QuotedRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteQuotedCommand, resolve: (value?) => void) {
    Logger.log('Async DeleteQuotedHandler...', 'DeleteQuotedCommand');
    const {quotedDto} = command;
    const quoted = this.publisher.mergeObjectContext(
      await this.repository.deleteQuoted(quotedDto),
    );
    quoted.commit();
    resolve();
  }
}
