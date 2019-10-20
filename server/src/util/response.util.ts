export interface IResponse<T> {
  isValid: boolean;
  body: T;
}

// type IResponseHelperFunction<T> = (body: T, isValid: boolean) => IResponse<T>;

export const responseHelper = (body: any, isValid = true) => {
  return {
    isValid,
    body
  };
};
