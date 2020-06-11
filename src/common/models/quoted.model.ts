import { AggregateRoot } from '@nestjs/cqrs';
import { QuotedCreatedEvent } from '../events/impl/quoted/quoted-created.event';
import { QuotedUpdatedEvent } from '../events/impl/quoted/quoted-updated.event';
import { QuotedDeletedEvent } from '../events/impl/quoted/quoted-deleted.event';

import { QuotedDto } from '../dtos/quoted.dto';

export class Quoted extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createQuoted() {
    this.apply(new QuotedCreatedEvent(this.data));
  }

  updateQuoted() {
    this.apply(new QuotedUpdatedEvent(this.data));
  }

  deleteQuoted() {
    this.apply(new QuotedDeletedEvent(this.id));
  }
}
