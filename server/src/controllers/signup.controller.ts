import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from '../util/database.util';

export const signupController: RequestHandler = (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;
  console.log(req.body);
  if (email && password && first_name && last_name) {
    const query = {
      name: 'signup-new-user',
      text:
        ' INSERT INTO public.users( first_name, last_name, email, password ) VALUES ($3, $4,$1, $2);',
      values: [email, password, first_name, last_name]
    };
    database
      .query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
        console.log('new user signed up');
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
  } else {
    res.status(401).json(responseHelper('Signup data is invalid', false));
  }
};
