export interface IStockTradeData {
  stock_symbol: string;
  stock_name: string;
  current_price: number;
  change: number;
  change_percent: number;
  quantity_owned: number;
  pastInvest: number;
}
