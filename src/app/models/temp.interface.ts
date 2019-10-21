import { IAPIStocks } from './apistocks.interface';

export class ITemp {
  _isScalar: boolean;
  observers: [];
  closed: boolean;
  isStopped: boolean;
  hasError: boolean;
  thrownError: string;
  _value: IAPIStocks[];
}
