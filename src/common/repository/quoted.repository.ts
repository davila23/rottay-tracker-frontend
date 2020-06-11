import { Injectable } from '@nestjs/common';
import { Quoted } from '../models/quoted.model';

@Injectable()
export class QuotedRepository {
  async createQuoted(quotedDto) {
    const quoted = new Quoted(undefined);
    quoted.setData(quotedDto);
    quoted.createQuoted();
    return quoted;
  }

  async updateQuoted(quotedDto) {
    const quoted = new Quoted(quotedDto.quotedId);
    quoted.setData(quotedDto);
    quoted.updateQuoted();
    return quoted;
  }

  async deleteQuoted(quotedDto) {
    const quoted = new Quoted(quotedDto.quotedId);
    quoted.deleteQuoted();
    return quoted;
  }


}
