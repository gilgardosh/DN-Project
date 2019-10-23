import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from './../util/database.util';

export const userStocksController: RequestHandler = (req, res, next) => {

  const { userId } = req.body;
  if ( !!userId ) {

    const query = {
      name: 'fetch-user-stocks-by-user-id',
      text: 'select * from public.user_stocks us join stocks s on s.stock_id = us.stock_id where us.user_id = $1',
      values: [userId],
    };

    database.query(query)
    .then(data => {
      res.status(200).json(responseHelper(data).body.rows);
    })
    .catch(err => {
      res.status(401).json(responseHelper(err, false));
    });

  } else {
    res
      .status(401)
      .json(responseHelper('User ID is invalid', false));
  }
};
