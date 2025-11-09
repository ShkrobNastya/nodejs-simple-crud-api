import { ServerResponse, IncomingMessage } from 'http';

export const sendJsonResponse = <T>(
  res: ServerResponse,
  status: number,
  data: T,
) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const getRequestBody = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};
