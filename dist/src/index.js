"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
require("dotenv/config");
const app = (0, express_1.default)();
const nodeServer = (0, node_http_1.createServer)(app);
const ioServer = new socket_io_1.Server(nodeServer);
app.use("/auth");
app.use("/games");
app.listen(process.env.PORT, () => {
    console.log(`server is ap and running ,  http://localhost:${process.env.PORT}`);
});
