import http from 'http';
import { userController } from './controllers/usersController';

http
  .createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    if (req.url === '/') {
      userController.getAllUsers(res);
    } else if (req.url == '/22') {
      userController.getUser('2', res);
    } else if (req.url == '/33') {
      userController.deleteUser('1', res);
    } else {
      // res.write(req.url == "/44");
      console.log('eeee');
    }
    res.end();
  })
  .listen(3000);
