import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateQuotedCommand } from '../../impl/quoted/update-quoted.command';
import { QuotedRepository } from '../../../repository/quoted.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(UpdateQuotedCommand)
export class UpdateQuotedHandler
  implements ICommandHandler<UpdateQuotedCommand> {
  constructor(
    private readonly repository: QuotedRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateQuotedCommand, resolve: (value?) => void) {
    Logger.log('Async UpdateQuotedHandler...', 'UpdateQuotedCommand');
    const {quotedDto} = command;
    const quoted = this.publisher.mergeObjectContext(
      await this.repository.updateQuoted(quotedDto),
    );
    quoted.commit();
    resolve();
  }
}
