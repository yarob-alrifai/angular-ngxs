import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../state/user/user.model';

export const USER_ENGINE = new InjectionToken<UserEngine>('USER_ENGINE');

export interface UserEngine {
  readonly users$: Observable<User[]>;

  fetchUsers(): Observable<void>;

  addUser(user: User): Observable<void>;

  removeUser(userId: number): Observable<void>;

  updateUser(user: User): Observable<void>;
}
