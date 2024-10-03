import { User } from './user.model';

const ACTION_SCOPE = '[User]';

export class AddUser {
  static readonly type = `${ACTION_SCOPE} Add`;
  constructor(public payload: User) {}
}

export class RemoveUser {
  static readonly type = `${ACTION_SCOPE} Remove`;
  constructor(public payload: number) {} 
}

export class UpdateUser {
  static readonly type = `${ACTION_SCOPE} Update`;
  constructor(public payload: User) {} 
}

export class FetchUsers {
  static readonly type = `${ACTION_SCOPE} Fetch All`;
}
