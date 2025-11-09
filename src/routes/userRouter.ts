import { IncomingMessage, ServerResponse } from 'http';
import { sendJsonResponse } from '../utils/helpers';
import { userController } from '../controllers/usersController';
import { STATUS_MESSAGES } from '../utils/constants';

export async function userRouter(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const method = req.method || '';

  try {
    if (method === 'GET' && url === '/api/users') {
      return userController.getAllUsers(res);
    }

    if (method === 'GET' && url.startsWith('/api/users/')) {
      const id = url.split('/')[3];
      return userController.getUserById(id, res);
    }

    if (method === 'POST' && url.startsWith('/api/users')) {
      return userController.createUser(req, res);
    }

    if (method === 'PUT' && url.startsWith('/api/users/')) {
      const id = url.split('/')[3];
      return userController.updateUser(id, req, res);
    }

    if (method === 'DELETE' && url.startsWith('/api/users/')) {
      const id = url.split('/')[3];
      return userController.deleteUser(id, res);
    }

    return sendJsonResponse(res, 404, {
      message: STATUS_MESSAGES.ROUTE_NOT_FOUND,
    });
  } catch {
    return sendJsonResponse(res, 500, {
      message: STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
}
