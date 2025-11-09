import { createServer, IncomingMessage, ServerResponse } from 'http';
import { userRouter } from './routes/userRouter';
import { STATUS_MESSAGES } from './utils/constants';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith('/api/users')) {
    return userRouter(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: STATUS_MESSAGES.ROUTE_NOT_FOUND }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
