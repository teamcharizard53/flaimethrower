import { useState, useEffect } from 'react';

const Messages = ({ user, selectedFriend }) => {
  // used to keep track of users messages
  const [messages, setMessages] = useState([
    {
      sender: 'Anthony',
      text: 'Hello!',
      timestamp: '2025-04-22T14:35:00Z',
    },
    {
      sender: 'Katherine',
      text: 'How are you?',
      timestamp: '2025-04-22T14:36:00Z',
    },
    {
      sender: 'Anthony',
      text: 'Good, how about you?',
      timestamp: '2025-04-22T14:37:00Z',
    },
    {
      sender: 'Katherine',
      text: 'Great! Thanks for asking.',
      timestamp: '2025-04-22T14:38:00Z',
    },
    {
      sender: 'Anthony',
      text: 'Lovely weather today am I right?',
      timestamp: '2025-04-22T14:39:00Z',
    },
    {
      sender: 'Katherine',
      text: 'Yes! I think the sun it great!',
      timestamp: '2025-04-22T14:40:00Z',
    },
    {
      sender: 'Anthony',
      text: 'Sweet Beans.',
      timestamp: '2025-04-22T14:41:00Z',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  // Used to get messages from the backend
  useEffect(() => {
    // Checks if there is a selected friend, if not exit
    if (!selectedFriend) return;
    // Get request to the back end for messages
    const fetchMessages = async () => {
      try {
        // Assign result to the json result
        const result = await fetch(
          `http://localhost:3000/api/messages?user=${user}&friend=${selectedFriend}`
        );
        // Assign data to the parsed json result
        const data = await result.json();
        // Set Messages to the receieved data from the back end
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };
    // Invoke the fetch messages function if selected friend exist
    fetchMessages();
    // Will be looking for changes to selected friend
  }, [selectedFriend, user]);

  // Used to handle sent messages
  const handleSendMessage = async () => {
    // Checks if there is a selected friend and message
    if (!newMessage.trim() || !selectedFriend) return;
    try {
      // Assign result to the result of the json result of the backend request
      const result = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: user,
          fname: selectedFriend,
          text: newMessage,
          timestamp: new Date().toISOString(),
        }),
      });

      // assign the saved message to the parsed json result
      const savedMessage = await result.json();
      // Update the messages
      setMessages((prev) => [...prev, savedMessage]);
      // Reset the value of the input
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div id='dashboard-messages'>
      <div id='dashboard-message-list'>
        {!selectedFriend ? (
          <p>Select a friend to start chatting.</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className='dashboard-message-bubble'>
              <span className='dashboard-message-text'>
                <strong>{message.sender}:</strong> {message.text}
              </span>
              <span className='dashboard-timestamp'>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))
        )}
      </div>
      <div id='dashboard-messages-send'>
        <input
          placeholder='Enter Message Here'
          id='dashboard-message-input'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          id='dashboard-message-button'
          onClick={() => handleSendMessage()}
        >
          Send Message!
        </button>
      </div>
    </div>
  );
};

export default Messages;
