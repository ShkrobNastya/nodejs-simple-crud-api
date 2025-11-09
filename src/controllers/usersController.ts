import { ServerResponse, IncomingMessage } from 'http';
import { validate as isUuid } from 'uuid';
import { userService } from '../services/usersService';
import { sendJsonResponse, getRequestBody } from '../utils/helpers';
import { STATUS_MESSAGES } from '../utils/constants';

export const userController = {
  getAllUsers: (res: ServerResponse) => {
    const users = userService.getAllUsers();
    return sendJsonResponse(res, 200, users);
  },

  getUserById: (id: string, res: ServerResponse) => {
    if (!isUuid(id)) {
      return sendJsonResponse(res, 400, {
        message: STATUS_MESSAGES.INVALID_ID,
      });
    }

    const user = userService.getUserById(id);
    if (!user) {
      return sendJsonResponse(res, 404, {
        message: STATUS_MESSAGES.USER_NOT_FOUND,
      });
    }

    return sendJsonResponse(res, 200, user);
  },

  createUser: async (req: IncomingMessage, res: ServerResponse) => {
    const body = await getRequestBody(req);

    const user = userService.createUser(body);
    if (!user) {
      return sendJsonResponse(res, 400, {
        message: STATUS_MESSAGES.INVALID_USER_DATA,
      });
    }
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  },

  updateUser: async (id: string, req: IncomingMessage, res: ServerResponse) => {
    const body = await getRequestBody(req);
    if (!isUuid(id)) {
      return sendJsonResponse(res, 400, {
        message: STATUS_MESSAGES.INVALID_ID,
      });
    }

    const updatedUser = userService.updateUser(id, body);
    if (!updatedUser) {
      return sendJsonResponse(res, 404, {
        message: STATUS_MESSAGES.USER_NOT_FOUND,
      });
    }

    return sendJsonResponse(res, 200, updatedUser);
  },

  deleteUser: (id: string, res: ServerResponse) => {
    if (!isUuid(id)) {
      return sendJsonResponse(res, 400, {
        message: STATUS_MESSAGES.INVALID_ID,
      });
    }

    const deleted = userService.deleteUser(id);

    if (!deleted) {
      return sendJsonResponse(res, 404, {
        message: STATUS_MESSAGES.INVALID_ID,
      });
    }

    res.writeHead(204);
    res.end();
  },
};
