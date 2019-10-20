import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from './../util/database.util';

export const userStocksController: RequestHandler = (req, res, next) => {
  // http://localhost:4040/api/v1/users/{{ userId }}

  const { userId, stock_symbol } = req.body;
  if (!!userId && stock_symbol) {
    if (stock_symbol == 'ALL') {
      database.query(
        ` select * from public.user_stocks us join stocks s on s.stock_id = us.stock_id where us.user_id='${userId}' `
      )
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
    } else {
      database.query(
        ` select * from public.user_stocks us
          join stocks s on s.stock_id = us.stock_id
          where us.user_id='${userId}' and s.stock_symbol='${stock_symbol}' `
      )
      .then(data => {
        res.status(200).json(responseHelper(data).body.rows);
      })
      .catch(err => {
        res.status(401).json(responseHelper(err, false));
      });
    }
  } else {
    res
      .status(401)
      .json(responseHelper('User ID is invalid', false));
  }
};
