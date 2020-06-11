import { CreateUserHandler } from './user/create-user.handler';
import { DeleteUserHandler } from './user/delete-user.handler';
import { UpdateUserHandler } from './user/update-user.handler';

import { CreateQuotedHandler } from './quoted/create-quoted.handler';
import { DeleteQuotedHandler } from './quoted/delete-quoted.handler';
import { UpdateQuotedHandler } from './quoted/update-quoted.handler';


import { WelcomeUserHandler } from './user/welcome-user.handler';

export const CommandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  WelcomeUserHandler,
  CreateQuotedHandler ,
  DeleteQuotedHandler ,
  UpdateQuotedHandler,
];
