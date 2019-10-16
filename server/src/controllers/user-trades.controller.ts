import { RequestHandler } from 'express';
import userTradeHistoryJSON from '../../../src/api/tradehistory/tradehistory.json';


export const userTradeHistoryController: RequestHandler = (req, res, next) => {
  // http://localhost:4040/api/v1/users/{{ userId }}

  const { userId } = req.params;
  const userData = JSON.parse(JSON.stringify(userTradeHistoryJSON));
  res.status(200).json(userData[userId]);
}
