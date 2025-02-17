import { createServer } from 'http';
import { app } from './app';
import { Server } from 'socket.io';
import { handleSocketEvents } from './routes/socket.routes';

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  handleSocketEvents(socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
