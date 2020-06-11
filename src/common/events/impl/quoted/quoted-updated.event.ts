import { IEvent } from '@nestjs/cqrs';
import { QuotedDto } from '../../../dtos/quoted.dto';

export class QuotedUpdatedEvent implements IEvent {
  constructor(
    public readonly quotedDto: QuotedDto) {


      console.log( 'POSTGRES = >  UPDATE QUOTED')

    }

    
}
