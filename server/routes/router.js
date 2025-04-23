import express from 'express';
const router = express.Router();
import { userController } from '../controllers/userController.js';
import { friendsController } from '../controllers/friendsController.js';

router.post('/addfriend', friendsController.addFriend, (req, res) => {
  res.status(200).send(res.locals.newFriend);
});

router.post('/register', userController.register, (req, res) => {
  console.log('hello I am in the express server.');
  console.log('username: ', res.locals.username);
  res.status(200).json(res.locals.username);
});

router.post('/message', friendsController.updateMessages, (req, res) => {
  res.status(200).send('Message sent!');
});

router.post('/login', userController.login, (req, res) => {
  res.status(200).json(res.locals.username);
});

router.get('/friendlist/:user', friendsController.getFriends, (req, res) => {
  res.status(200).json(res.locals.friendList);
});

export default router;
