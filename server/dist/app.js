"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const headers_util_1 = require("./util/headers.util");
const users_routing_1 = __importDefault(require("./routes/users.routing"));
const app = express_1.default();
const port = process.env.PORT || 4040;
app.use(body_parser_1.urlencoded({ limit: '500mb', extended: true }));
app.use(headers_util_1.headersController);
app.use('/api', body_parser_1.json({ limit: '500mb' }));
app.use('/api/v1/users', users_routing_1.default);
app.listen(port, () => {
    console.log(port);
});
