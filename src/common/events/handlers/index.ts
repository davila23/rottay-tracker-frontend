import { UserCreatedHandler} from './user/user-created.handler';
import { UserUpdatedHandler} from './user/user-updated.handler';
import { UserDeletedHandler} from './user/user-deleted.handler';
import { UserWelcomedHandler} from './user/user-welcomed.handler';
import { QuotedCreatedHandler} from './quoted/quoted-created.handler';
import { QuotedUpdatedHandler} from './quoted/quoted-updated.handler';
import { QuotedDeletedHandler} from './quoted/quoted-deleted.handler';

export const EventHandlers = [
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler,
  QuotedCreatedHandler,
  QuotedUpdatedHandler,
  QuotedDeletedHandler,
];
