import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { database } from '../util/database.util';


export const stocksListController: RequestHandler = (req, res, next) => {
  const query = {
    name: 'fetch-stocks-list',
    text: 'select stock_symbol from public.stocks',
  };
  database
    .query(query)
    .then(data => {
      res.status(200).json(responseHelper(data).body.rows);
    })
    .catch(err => {
      res.status(401).json(responseHelper(err, false));
    });
};
