import { Users, Friends } from '../models.js';

const userController = {};

userController.register = async (req, res, next) => {
  const { uname, pword, email } = req.body;

  const newUser = new Users({ username: uname, password: pword, email: email });
  const newUserFriends = new Friends({
    username: uname,
    friendList: [
      {
        friendName: 'aiChatBot',
        messages: [{ from: 'aiChatBot', message: 'you are my only friend' }],
      },
    ],
  });
  console.log('newUser: ', newUser);
  console.log('newUserFriends: ', newUserFriends);
  // const preExists = await Users.findOne({ username: uname });
  if (false) {
    return next({ error: 'Username already exists.' });
  } else {
    console.log('gonna try saving user');
    newUser.save();
    console.log('user saved!');
    console.log('gonna try saving friends list');
    newUserFriends.save();
    console.log('friends list saved!');
    res.locals.username = uname;
    return next();
  }
};

userController.login = async (req, res, next) => {
  const { uname, pword } = req.body;
  res.locals.loggedIn = false;
  const credentials = await Users.findOne({ username: uname });
  if (credentials.password === pword) {
    res.locals.loggedIn = true;
    res.locals.username = uname;
    return next();
  } else {
    return next();
  }
};

export { userController };
