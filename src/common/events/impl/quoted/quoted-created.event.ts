import { IEvent } from '@nestjs/cqrs';
import { QuotedDto } from '../../../dtos/quoted.dto';

export class QuotedCreatedEvent implements IEvent {
  constructor(
    public readonly quotedDto: QuotedDto) {


      console.log( 'POSTGRES = >  POST QUOTED')
    }

    
}
