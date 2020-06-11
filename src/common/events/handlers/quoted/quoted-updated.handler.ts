import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { QuotedUpdatedEvent } from '../../impl/quoted/quoted-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(QuotedUpdatedEvent)
export class QuotedUpdatedHandler
  implements IEventHandler<QuotedUpdatedEvent> {
  handle(event: QuotedUpdatedEvent) {
    Logger.log(event, 'QuotedUpdatedEvent'); // write here
  }
}
