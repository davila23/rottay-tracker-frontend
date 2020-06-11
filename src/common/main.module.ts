import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QuotedSagas } from './sagas/quoted.sagas';
import { QuotedController } from './controllers/quoted.controller';
import { QuotedService } from './services/quoted.service';
import { QuotedRepository } from './repository/quoted.repository';
import { UsersSagas } from './sagas/users.sagas';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserRepository } from './repository/user.repository';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { EventStore } from '../core/event-store/event-store';
import { UserCreatedEvent } from './events/impl/user/user-created.event';
import { UserDeletedEvent } from './events/impl/user/user-deleted.event';
import { UserUpdatedEvent } from './events/impl/user/user-updated.event';
import { UserWelcomedEvent } from './events/impl/user/user-welcomed.event';
import { QuotedCreatedEvent } from './events/impl/quoted/quoted-created.event';
import { QuotedDeletedEvent } from './events/impl/quoted/quoted-deleted.event';
import { QuotedUpdatedEvent } from './events/impl/quoted/quoted-updated.event';

@Module({
  imports: [
    CQRSModule,
    EventStoreModule.forFeature(),
  ],
  controllers: [UsersController,QuotedController],
  providers: [
    UsersService,
    UsersSagas,
    QuotedService,
    QuotedSagas,
    ...CommandHandlers,
    ...EventHandlers,
    UserRepository,
    QuotedRepository,
  ],
})

export class MainModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly usersSagas: UsersSagas,
    private readonly eventStore: EventStore,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);
    /** ------------ */
    this.eventStore.setEventHandlers(this.eventHandlers);
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.event$.register(EventHandlers);
    this.command$.register(CommandHandlers);
    this.event$.combineSagas([this.usersSagas.userCreated]);
  }
  eventHandlers = {
    UserCreatedEvent: (data) => new UserCreatedEvent(data),
    UserDeletedEvent: (data) => new UserDeletedEvent(data),
    UserUpdatedEvent: (data) => new UserUpdatedEvent(data),
    UserWelcomedEvent: (data) => new UserWelcomedEvent(data),
    QuotedCreatedEvent: (data) => new QuotedCreatedEvent(data),
    QuotedDeletedEvent: (data) => new QuotedDeletedEvent(data),
    QuotedUpdatedEvent: (data) => new QuotedUpdatedEvent(data),
  };
}
