import express from 'express';
const router = express.Router();
import { userController } from '../controllers/userController.js';
import { friendsController } from '../controllers/friendsController.js';

router.post('/addfriend', friendsController.addFriend, (req, res) => {
    res.status(200).send(res.locals.newFriend)
});

export default router;
