import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../state/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserBackendService {
  simulateFetchUsers(): Observable<User[]> {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];
    return of(users);
  }

  simulateAddUser(user: User): Observable<User> {
    user.id = Math.floor(Math.random() * 1000);
    return of(user);
  }

  simulateUpdateUser(user: User): Observable<User> {
    return of(user);
  }

  simulateRemoveUser(userId: number): Observable<void> {
    return of(undefined);
  }
}
