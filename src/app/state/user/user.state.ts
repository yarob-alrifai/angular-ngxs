import { State, Action, StateContext, Selector } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { AddUser, RemoveUser, FetchUsers, UpdateUser } from './user.actions';
import { User, UserStateModel, USER_INITIAL_STATE } from './user.model';
import { UserBackendService } from '../../backend-services/user-backend.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@State<UserStateModel>({
  name: 'user',
  defaults: USER_INITIAL_STATE,
})
@Injectable()
export class UserState {
  readonly #userBackendService = inject(UserBackendService);

  @Selector()
  static getUsers(state: UserStateModel): User[] {
    return state.users;
  }

  @Selector()
  static isLoading(state: UserStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static getError(state: UserStateModel): string | null {
    return state.error;
  }

  @Action(AddUser)
  addUser(
    { patchState, getState }: StateContext<UserStateModel>,
    { payload }: AddUser,
  ):Observable<User> {
    patchState({ isLoading: true, error: null });

    return this.#userBackendService.simulateAddUser(payload).pipe(
      tap((newUser: User) => {
        const state = getState();
        patchState({
          users: [...state.users, newUser],
          isLoading: false,
          error: null,
        });
      }),
      catchError((error) => {
        patchState({
          isLoading: false,
          error: 'Failed to add user',
        });
        return throwError(error);
      }),
    );
  }

  @Action(UpdateUser)
  updateUser(
    { patchState, getState }: StateContext<UserStateModel>,
    { payload }: UpdateUser,
  ):Observable<User> {
    patchState({ isLoading: true, error: null });

    return this.#userBackendService.simulateUpdateUser(payload).pipe(
      tap((updatedUser: User) => {
        const state = getState();
        const updatedUsers = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        );
        console.log('inthe state');
        patchState({
          users: updatedUsers,
          isLoading: false,
          error: null,
        });
      }),
      catchError((error) => {
        patchState({
          isLoading: false,
          error: 'Failed to update user',
        });
        return throwError(error);
      }),
    );
  }

  @Action(RemoveUser)
  removeUser(
    { patchState, getState }: StateContext<UserStateModel>,
    { payload }: RemoveUser,
  ):Observable<void> {
    patchState({ isLoading: true, error: null });

    return this.#userBackendService.simulateRemoveUser(payload).pipe(
      tap(() => {
        const state = getState();
        patchState({
          users: state.users.filter((user) => user.id !== payload),
          isLoading: false,
          error: null,
        });
      }),
      catchError((error) => {
        patchState({
          isLoading: false,
          error: 'Failed to remove user',
        });
        return throwError(error);
      }),
    );
  }

  @Action(FetchUsers)
  fetchUsers({ patchState }: StateContext<UserStateModel>) :Observable<User[]>{
    patchState({ isLoading: true, error: null });

    return this.#userBackendService.simulateFetchUsers().pipe(
      tap((users: User[]) => {
        patchState({
          users,
          isLoading: false,
          error: null,
        });
      }),
      catchError((error) => {
        patchState({
          isLoading: false,
          error: 'Failed to fetch users',
        });
        return throwError(error);
      }),
    );
  }
}
