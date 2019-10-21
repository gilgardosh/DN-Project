import { RequestHandler } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { responseHelper } from '../response.util';
import { secret } from '../secret';

export const tokenMiddleware: RequestHandler = (req, res, next) => {
  try {
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    } else if (!token) {
      throw new Error('Not Auth');
    }
    const isValid = verify(token, secret);
    console.log(isValid);

    next();
  } catch (e) {
    res.status(401).json(responseHelper(e, false));
  }
};

export const setTokenOnHeader = (res: any, token: string): boolean => {
  try {
    res.setHeader('Authorization', `Bearer ${token}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
