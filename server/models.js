import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'flaimethrower',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model('message', messageSchema);

// const friendSchema = new Schema({
//   username: String,
//   friendList: [
//     { friendName: String, messages: [{ from: String, message: String }] },
//   ],
// });

const friendSchema = new Schema({
  username: String,
  friendList: { type: Map, of: [messageSchema] },
});

const Friends = mongoose.model('friend', friendSchema);

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const Users = mongoose.model('user', userSchema);

export { Friends, Users, Messages };
