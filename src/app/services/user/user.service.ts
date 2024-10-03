import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';
import {
  AddUser,
  FetchUsers,
  RemoveUser,
  UpdateUser,
  User,
  UserState,
} from '../../state/user';
import { UserEngine } from './user.service.interface';

@Injectable()
export class UserService implements UserEngine {
  readonly #store = inject(Store);
  readonly users$: Observable<User[]> = this.#store.select(UserState.getUsers);

  fetchUsers = (): Observable<void> => this.#store.dispatch(new FetchUsers());
  addUser = (user: User): Observable<void> =>
    this.#store.dispatch(new AddUser(user));
  removeUser = (userId: number): Observable<void> =>
    this.#store.dispatch(new RemoveUser(userId));
  updateUser = (user: User): Observable<void> =>
    this.#store.dispatch([new UpdateUser(user), new FetchUsers()]);
}
