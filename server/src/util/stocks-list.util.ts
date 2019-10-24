import { database } from './database.util';

export const getStocksList = async () => {
  try {
    const query = {
      name: 'fetch-stocks-list',
      text: 'select stock_symbol from public.stocks'
    };

    const data: any = await database.query(query);
    const list: any[] = data.rows;
    return list;
  } catch (error) {
    console.log(error);
    return [];
  }
};
