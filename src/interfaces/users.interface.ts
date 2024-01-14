export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role?: string;
}

export enum USER_TYPE {
  USER = 'user',
  ADMIN = 'admin'
}