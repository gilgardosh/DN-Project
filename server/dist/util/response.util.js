"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// type IResponseHelperFunction<T> = (body: T, isValid: boolean) => IResponse<T>;
exports.responseHelper = (body, isValid = true) => {
    return {
        isValid,
        body
    };
};
