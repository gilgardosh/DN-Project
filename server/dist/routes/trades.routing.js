"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_trades_controller_1 = require("../controllers/user-trades.controller");
const router = express_1.default.Router();
router.post('/', user_trades_controller_1.userTradeHistoryController);
exports.default = router;
