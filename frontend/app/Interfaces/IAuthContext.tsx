import { IUser } from './IUser';

export interface IAuthContext {
  userData: IUser | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userId: number | null;
  role: string | null;
}
