import { IUser } from './IUser';

export interface IAuthContext {
  userData: IUser | null;
  loading: boolean;
  userId: number | null;
  role: string | null;
}
