import { IEvent } from '@nestjs/cqrs';

export class QuotedDeletedEvent implements IEvent {
  constructor(
    public readonly quotedId: string) {}
}