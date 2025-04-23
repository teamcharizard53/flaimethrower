import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Messages from './components/Messages';
import FriendList from './components/FriendList';
import '../styles.css';

const Dashboard = () => {
  // Used to keep track of logged in user
  const { user } = useParams();
  // Used to keep track of the selected friend
  const [selectedFriend, setSelectedFriend] = useState('');
  console.log(selectedFriend);
  console.log(user);

  return (
    <div id='dashboard-main-container'>
      <Messages user={user} selectedFriend={selectedFriend} />
      <FriendList user={user} setSelectedFriend={setSelectedFriend} />
    </div>
  );
};

export default Dashboard;
