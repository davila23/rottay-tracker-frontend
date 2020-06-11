import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, EventObservable } from '@nestjs/cqrs';
import { QuotedCreatedEvent } from '../events/impl/quoted/quoted-created.event';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class QuotedSagas {
  quotedCreated = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$
      .ofType(QuotedCreatedEvent)
    /*  .pipe(
        delay(1000),
        map(event => {
          Logger.log('Inside [QuotedSagas] Saga', 'QuotedSagas');
          const quotedId = event.quotedDto[0].quotedId[0];
          return new WelcomeUserCommand(quotedId);
        }),
      );*/
  }
}
