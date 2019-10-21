
const iex = require('iexcloud_api_wrapper');

export const quote = (sym: string) => {
  const sender = iex.quote(sym);
  return sender;
};

export const quotes = (symbols: string[]) => {
  const quoteRequests = [];
  for (const symbol of symbols) {
    quoteRequests.push(quote(symbol));
  }
  return Promise.all(quoteRequests);
};
