import { Friends, Users, Messages } from '../models.js';

const friendsController = {};

friendsController.addFriend = async (req, res, next) => {
  const { uname, fname } = req.body;
  const userExists = await Users.findOne({ username: uname });
  const userFriends = await Friends.findOne({ username: uname });
  const friendExists = await Users.findOne({ username: fname });

  console.log('fname: ', fname);
  console.log('uname: ', uname);

  if (userExists && friendExists) {
    console.log('userExists: ', userExists);
    console.log('userFriend: ', userFriends);
    userFriends.friendList.push({
      friendName: fname,
      messages: [
        {
          from: '<flaimethrower-admin>',
          message: `${uname} and ${fname} are now friends!`,
        },
      ],
    });
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

  if (userFriends && receiving) {
    let i = 0;
    let j = 0;
    while (
      i < userFriends.friendList.length &&
      userFriends.friendlist[i].friendName !== fname
    ) {
      i++;
    }
    while (
      j < receiving.friendList.length &&
      receiving.friendlist[j].friendName !== uname
    ) {
      j++;
    }
    console.log('i: ', i);
    console.log('j:', j);

    const uMessages = userFriends.friendList[i];
    const fMessages = receiving.friendList[j];
    const sentMessage = { sender: uname, text: text };
    const recMessage = { sender: fname, text: text };
    uMessages.messages.push(sentMessage);
    fMessages.messages.push(recMessagel);
    userFriends.friendList[i] = uMessages;
    receiving.friendList[j] = fMessages;

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
  }
};

export { friendsController };
