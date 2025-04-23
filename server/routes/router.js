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

router.post('/message', friendsController.updateMessages)

export default router;
