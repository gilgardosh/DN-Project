import { RequestHandler } from 'express';
import { responseHelper } from '../util/response.util';
import { getStocksList } from '../util/stocks-list.util';

export const stocksListController: RequestHandler = async (req, res, next) => {
  try {
    const data = await getStocksList();
    res.status(200).json(responseHelper(data));
  } catch (error) {
    res.status(401).json(responseHelper(error, false));
  }
};
