import { ICommand } from '@nestjs/cqrs';

export class WelcomeQuotedCommand implements ICommand {
  constructor(
    public readonly quotedId: string,
  ) {}
}
