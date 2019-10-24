"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iex = require('iexcloud_api_wrapper');
exports.quote = (sym) => {
    const sender = iex.quote(sym);
    return sender;
};
exports.quotes = (symbols) => {
    const quoteRequests = [];
    for (const symbol of symbols) {
        quoteRequests.push(exports.quote(symbol));
    }
    return Promise.all(quoteRequests);
};
