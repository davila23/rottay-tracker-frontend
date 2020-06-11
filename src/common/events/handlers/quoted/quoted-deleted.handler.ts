import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { QuotedDeletedEvent } from '../../impl/quoted/quoted-deleted.event';
import { Logger } from '@nestjs/common';

@EventsHandler(QuotedDeletedEvent)
export class QuotedDeletedHandler
  implements IEventHandler<QuotedDeletedEvent> {
  handle(event: QuotedDeletedEvent) {
    Logger.log(event, 'QuotedDeletedEvent'); // write here
  }
}
