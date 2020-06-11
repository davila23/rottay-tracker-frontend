import { Module, OnModuleInit } from '@nestjs/common';
import { MainModule } from './common/main.module';

import { EventStoreModule } from './core/event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot(),
    MainModule,
  ],
})
export class AppModule implements OnModuleInit {

   async onModuleInit() {}
}
