import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FriendList = ({ user, setSelectedFriend }) => {
  const navigate = useNavigate();
  const [addFriend, setAddFriend] = useState('');
  const [friendList, setFriendList] = useState([
    { name: 'aiBot', online: true },
    { name: 'Monique', online: false },
    { name: 'Reva', online: true },
    { name: 'Katherine', online: false },
    { name: 'Samyak', online: true },
  ]);

  // Used to get friendlist from the backend
  useEffect(() => {
    // Checks if there is a user, if not exit
    if (!user) return;
    // Get request to the back end for friend list
    const fetchFriendList = async () => {
      try {
        // Assign result to the json result
        const result = await fetch(
          `http://localhost:3000/api/friendlist/${user}`
        );
        // Assign data to the parsed json result
        const data = await result.json();
        // Set friend list to the receieved data from the back end
        setFriendList(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };
    // Invoke the fetch friend list function if user exist
    fetchFriendList();
    // Will be looking for changes to user
  }, [user]);

  // Used to logout
  const handleLogout = () => {
    // Navigate back to the login back
    navigate('/');
  };

  // Used to add friends
  const handleAddFriend = async () => {
    // Checks if there is a friend to add
    if (!addFriend.trim()) return;
    try {
      // Assign result to the result of the json result of the backend request
      const result = await fetch('http://localhost:3000/api/friendlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: user,
          fname: addFriend,
        }),
      });

      // assign new friend to the parsed json result
      const newFriend = await result.json();
      // Update the friend list
      setFriendList((prev) => [...prev, newFriend]);
      // Reset the value of the input
      setAddFriend('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // Used to delete friends
  const handleDeleteFriend = async (friendName) => {
    try {
      // Assign result to the result of the json result of the backend request
      await fetch('http://localhost:3000/api/friendlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: user,
          fname: friendName,
        }),
      });
      // Remove friend from state
      setFriendList((prev) => prev.filter((f) => f.name !== friendName));
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div id='dashboard-friend-list'>
      <div id='dashboard-friend-list-header'>
        <h2>Friend List (0/{friendList.length})</h2>
        <div id='dashboard-friend-list-names'>
          {friendList.map((friend, idx) => (
            <div key={idx} className='dashboard-friend-entry'>
              {friend.online && <span className='dashboard-online-dot'></span>}
              <div className='dashboard-friend-name-wrapper'>
                <button
                  className='dashboard-friend-name-button'
                  onClick={() => setSelectedFriend(friend.name)}
                >
                  {friend.name}
                </button>
                <button
                  className='dashboard-delete-friend-button'
                  onClick={() => handleDeleteFriend(friend.name)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id='dashboard-buttons-container'>
        <button className='dashboard-buttons' onClick={() => handleLogout()}>
          Logout
        </button>
        <input
          placeholder='Enter Friend Name Here!'
          id='dashboard-add-friend-input'
          onChange={(e) => setAddFriend(e.target.value)}
        />
        <button className='dashboard-buttons' onClick={() => handleAddFriend()}>
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default FriendList;
