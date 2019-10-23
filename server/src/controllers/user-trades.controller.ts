import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from '../util/database.util';

export const userTradeHistoryController: RequestHandler = (req, res, next) => {

  const { userId } = req.body;
  if (!!userId) {
    const query = {
      name: 'fetch-trades-by-user-id',
      text: 'select * from public.user_trades ut join stocks s on s.stock_id = ut.stock_id where ut.user_id=$1',
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
    res.status(401).json(responseHelper('UserTrades are invalid', false));
  }
};
