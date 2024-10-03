export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserStateModel {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export const USER_INITIAL_STATE: UserStateModel = {
  users: [],
  isLoading: false,
  error: null,
};

export const defaultUser: User = {
  id: 0,
  name: 'Default User',
  email: 'default@example.com',
};
