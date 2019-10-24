import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from './../util/database.util';
import { sign } from 'jsonwebtoken';
import { secret } from '../util/secret';
import { setTokenOnHeader } from '../util/middleware/token.middleware';

export const loginController: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const query = {
      name: 'fetch-user-by-credentials',
      text: 'select * from public.users where email = $1 and password = $2',
      values: [email, password]
    };
    database
      .query(query)
      .then(data => {
        console.log(data)
        const user = data.rows[0];
        const token = sign(user || {}, secret, {
          expiresIn: '24h'
        });
        setTokenOnHeader(res, token);
        res.status(200).json(responseHelper(user));
      })
      .catch(err => {
        console.log(err);

        res.status(401).json(responseHelper(err, false));
      });
  } else {
    res
      .status(401)
      .json(responseHelper('Email or Password are invalid', false));
  }
};
