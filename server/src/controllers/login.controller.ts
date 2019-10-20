import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from './../util/database.util';

export const loginController: RequestHandler = (req, res, next) => {

  const { email, password } = req.body;
  if (email && password) {
    const query = {
      // give the query a unique name
      name: 'fetch-user-by-credentials',
      text: 'select * from public.users where email = $1 and password = $2',
      values: [email, password],
    };

    database
      .query(query)
      .then(data => {
        res.status(200).json(responseHelper(data.rows[0]).body);
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
  } else {
    res
      .status(401)
      .json(responseHelper('Email or Password are invalid', false));
  }
};
