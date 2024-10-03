import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { USER_ENGINE } from './services/user/user.service.interface';
import { User } from './state/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [JsonPipe, FormsModule, NgTemplateOutlet],
  providers: [
    {
      provide: USER_ENGINE,
      useClass: UserService,
    },
  ],
})
export class AppComponent implements OnInit {
  newUser: User = { id: 0, name: '', email: '' };

  readonly #userService = inject(USER_ENGINE);
  ngOnInit(): void {
    this.#userService.fetchUsers();
  }

  readonly users = toSignal<User[]>(this.#userService.users$);

  addUser() {
    const newId = this.users.length + 1;
    const user = { ...this.newUser, id: newId };
    this.#userService.addUser(user);
    this.resetForm();
  }
  removeUser(user: User) {
    this.#userService.removeUser(user.id);
  }

  editUser(user: User) {
    this.#userService.updateUser(user);
  }

  resetForm() {
    this.newUser = { id: 0, name: '', email: '' };
  }
}
