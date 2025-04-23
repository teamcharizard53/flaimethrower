import { Users, Friends } from '../models';

const userController = {};

userController.register = async (req, res, next) => {
  const { uname, pword, email } = req.body;

  const newUser = new Users({ username: uname, password: pword, email: email });
  const newUserFriends = new Friends({
    username: uname,
    friendsList: new Map(),
  });

  const preExists = await Users.findOne({ username: uname });
  if (preExists) {
    return next({ error: 'Username already exists.' });
  } else {
    newUser.save();
    newUserFriends.save();
    return next();
  }
};

userController.login = async (req, res, next) => {
  const { uname, pword } = req.body;
  res.locals.loggedIn = false;
  const credentials = await Users.findOne({ username: uname });
  if (credentials.password === pword) {
    res.locals.loggedIn = true;
    return next();
  } else {
    return next();
  }
};

export { userController };
