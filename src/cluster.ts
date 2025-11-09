import cluster from 'cluster';
import os from 'os';
import http from 'http';
import dotenv from 'dotenv';
import { sendJsonResponse } from './utils/helpers';
import { IncomingMessage, ServerResponse } from 'http';
import { userRouter } from './routes/userRouter';
import { STATUS_MESSAGES } from './utils/constants';

dotenv.config();

const BASE_PORT = Number(process.env.PORT) || 4000;
const numCPUs = Math.max(os.availableParallelism() - 1, 1);

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} running`);
  console.log(`Starting ${numCPUs} worker instances...`);

  const workerPorts: number[] = [];
  for (let i = 0; i < numCPUs; i++) {
    const workerPort = BASE_PORT + 1 + i;
    workerPorts.push(workerPort);
    cluster.fork({ WORKER_PORT: workerPort });
  }

  let currentIndex = 0;

  const loadBalancer = http.createServer((req, res) => {
    const targetPort = workerPorts[currentIndex];
    currentIndex = (currentIndex + 1) % workerPorts.length;

    console.log(`Forwarding request to worker on port ${targetPort}`);

    const proxyReq = http.request(
      {
        hostname: 'localhost',
        port: targetPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      },
    );

    proxyReq.on('error', (err) => {
      console.error(`Proxy request error: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    });

    req.pipe(proxyReq, { end: true });
  });

  loadBalancer.listen(BASE_PORT, () => {
    console.log(`Load balancer is on port ${BASE_PORT}`);
  });
} else {
  const PORT = Number(process.env.WORKER_PORT) || BASE_PORT + 1;

  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      if (req.url?.startsWith('/api/users')) {
        return userRouter(req, res);
      }

      return sendJsonResponse(res, 404, {
        message: STATUS_MESSAGES.ROUTE_NOT_FOUND,
      });
    },
  );

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}
