export interface IUser {
  readonly id: string;
  readonly login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
