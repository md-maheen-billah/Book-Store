"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./modules/book/book.route");
const order_route_1 = require("./modules/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/products", book_route_1.BookRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send({
        status: true,
        message: "Server is Live ⚡",
    });
});
exports.default = app;