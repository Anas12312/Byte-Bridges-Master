"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = require("http");
const app_1 = require("./app");
const socket_io_1 = require("socket.io");
const socket_routes_1 = require("./routes/socket.routes");
const PORT = process.env.PORT || 3000;
const httpServer = (0, http_1.createServer)(app_1.app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    (0, socket_routes_1.handleSocketEvents)(socket);
});
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
