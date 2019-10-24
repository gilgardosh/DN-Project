"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const login_routing_1 = __importDefault(require("./routes/login.routing"));
const signup_routing_1 = __importDefault(require("./routes/signup.routing"));
const inituser_routing_1 = __importDefault(require("./routes/inituser.routing"));
const trades_routing_1 = __importDefault(require("./routes/trades.routing"));
const userstocks_routing_1 = __importDefault(require("./routes/userstocks.routing"));
const stockslist_routing_1 = __importDefault(require("./routes/stockslist.routing"));
const transaction1_routing_1 = __importDefault(require("./routes/transaction1.routing"));
const transaction2_routing_1 = __importDefault(require("./routes/transaction2.routing"));
const stock_1 = require("./stock");
const database_util_1 = require("./util/database.util");
const headers_util_1 = require("./util/headers.util");
const stocks_list_util_1 = require("./util/stocks-list.util");
// import { tokenMiddleware } from './util/middleware/token.middleware';
const morgan = require('morgan');
const app = express_1.default();
app.use(body_parser_1.urlencoded({ limit: '500mb', extended: true }));
app.use(headers_util_1.headersController);
app.use(morgan('dev'));
app.use('/api', body_parser_1.json({ limit: '500mb' }));
app.use('/api/v1/login', login_routing_1.default);
app.use('/api/v1/signup', signup_routing_1.default);
// app.use(tokenMiddleware);
app.use('/api/v1/inituser', inituser_routing_1.default);
app.use('/api/v1/transaction1', transaction1_routing_1.default);
app.use('/api/v1/transaction2', transaction2_routing_1.default);
app.use('/api/v1/tradeHistory', trades_routing_1.default);
app.use('/api/v1/userStocks', userstocks_routing_1.default);
app.use('/api/v1/stocksList', stockslist_routing_1.default);
const port = process.env.PORT || 4040;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let symbolsLiveData = [];
server.listen(port, () => {
    console.log(port);
    database_util_1.database
        .connect()
        .then(value => {
        console.log('connected');
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let list = yield stocks_list_util_1.getStocksList();
                list = list.map(stockObj => stockObj['stock_symbol']);
                symbolsLiveData = yield stock_1.quotes(list);
                io.emit('stocksupdate', symbolsLiveData);
            }
            catch (e) { }
        }), 10000);
        io.sockets.on('connection', (socket) => {
            socket.emit('stocksupdate', symbolsLiveData);
        });
    })
        .catch(error => {
        console.log(error);
    });
});
