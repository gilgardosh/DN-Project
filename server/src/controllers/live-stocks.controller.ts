import { RequestHandler } from 'express';
import liveStocksJSON from '../../../src/api/livestocks/livestocks.json';


export const liveStocksController: RequestHandler = (req, res, next) => {
  // http://localhost:4040/api/v1/users/{{ userId }}

  const userData = JSON.parse(JSON.stringify(liveStocksJSON));
  res.status(200).json(liveStocksJSON);
}
