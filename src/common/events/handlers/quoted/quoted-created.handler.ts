
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { QuotedCreatedEvent } from '../../impl/quoted/quoted-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(QuotedCreatedEvent)
export class QuotedCreatedHandler
  implements IEventHandler<QuotedCreatedEvent> {
  handle(event: QuotedCreatedEvent) {
    Logger.log(event, 'QuotedCreatedEvent   2'); // write here
    console.log('QuotedCreatedEvent   2')
  }
}
