import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from '../util/database.util';

export const initUserController: RequestHandler = (req, res, next) => {
  const { userId } = req.body;
  if (!!userId) {
    console.log(userId);

    const query = {
      name: 'make-sell-transaction-on-user-stocks',
      text:
        'INSERT INTO public.user_stocks(user_id, stock_id) VALUES ($1, 1), ($1, 2), ($1, 3), ($1, 4), ($1, 5);',
      values: [userId]
    };
    database
      .query(query)
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
  } else {
    res
      .status(401)
      .json(responseHelper('User Wallet Initiation Failed', false));
  }
};
