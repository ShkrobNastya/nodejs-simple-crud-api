import { userService } from '../services/usersService';
import { ServerResponse, IncomingMessage } from 'http';

export const userController = {
  getAllUsers: (res: ServerResponse) => {
    const users = userService.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  },

  getUser: (id: string, res: ServerResponse) => {
    const user = userService.getUserById(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  },
  createUser: async (req: IncomingMessage, res: ServerResponse) => {
    // const user = userService.createUser(body);
  },

  updateUser: async (id: string, req: IncomingMessage, res: ServerResponse) => {
    // const updated = userService.updateUser(id, body);
  },

  deleteUser: (id: string, res: ServerResponse) => {
    const deleted = userService.deleteUser(id);
    console.log(deleted);
    if (deleted) {
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
  },
};
