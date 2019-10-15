import { IUserStocks } from './userstocks.interface';

export interface IUserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  activeStocks: IUserStocks[];
}
