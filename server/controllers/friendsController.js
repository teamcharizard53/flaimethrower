import { Friends, Users, Messages } from '../models.js';

const friendsController = {};

friendsController.addFriend = async (req, res, next) => {
  const { uname, fname } = req.body;
  const userExists = await Users.findOne({ username: uname });
  const userFriends = await Friends.findOne({ username: uname });
  const friendExists = await Users.findOne({ username: fname });

  if (userExists && friendExists) {
    userFriends.friendList.set(fName, []);
    const newFriend = await Friends.findOneAndUpdate(
      { username: uname },
      { friendList: userFriends.friendList },
      { new: true }
    );
    console.log('New Friend added: ', newFriend);
    
    // Added for testing purposes
    // res.locals.newFriend = {name:fname, status: 'online'}

    return next();
  } else {
    return next({ error: 'One or both usernames could not be found.' });
  }
};

friendsController.deleteFriend = async (req, res, next) => {
  const { uname, fname } = req.body;
  const userFriends = await Friends.findOne({ username: uname });

  if (userFriends.friendList.has(fname)) {
    userFriends.friendList.delete(fname);
    const deleteFriend = await Friends.findOneAndUpdate(
      { username: uname },
      { friendList: userFriends.friendList },
      { new: true }
    );
    console.log('Friend deleted: ', deleteFriend);
    return next();
  } else {
    return next({ error: 'Friend name could not be found.' });
  }
};

friendsController.updateMessages = async (req, res, next) => {
  const { uname, fname, text } = req.body;
  const userFriends = await Friends.findOne({ username: uname });
  const receiving = await Friends.findOne({ username: fname });

  if (userFriends.friendList.has(fname)) {
    const uMessages = userFriends.friendList[fname];
    const fMessages = receiving.freindsList[uname];
    const sentMessage = new Messages({ sender: uname, text: text });
    const recMessage = new Messages({ sender: fname, text: text });
    uMessages.push(sentMessage);
    fMessages.push(recMessagel);
    userFriends.friendList[fname] = uMessages;
    receiving.friendList[uname] = fMessages;

    Friends.findOneAndUpdate(
      { username: uname },
      { friendList: userFriends.friendList }
    ).then(() => {
      Friends.findOneAndUpdate(
        { username: fname },
        { friendList: receiving.friendList }
      ).then(() => {
        console.log('Messages updated!');
        return next();
      });
    });
  } else {
    return next({ error: 'Friend name could not be found.' });
  }
};

export { friendsController };
