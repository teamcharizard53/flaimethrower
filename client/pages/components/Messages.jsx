import { useState, useEffect } from 'react';

const Messages = ({ user, selectedFriend }) => {
  // used to keep track of users messages
  const [messages, setMessages] = useState([
    { Anthony: 'Hello!' },
    { Katherine: 'How are you?' },
    { Anthony: 'Good, how about you?' },
    { Katherine: 'Great! Thanks for asking.' },
    { Anthony: 'Lovely waether today am I right?' },
    { Katherine: 'Yes! I think the sun it great!' },
    { Anthony: 'Sweet Beans.' },
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
          sender: user,
          recipient: selectedFriend,
          text: newMessage,
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
        {messages.map((message, index) => {
          for (const [sender, text] of Object.entries(message)) {
            return (
              <p key={index}>
                <strong>{sender}:</strong> {text}
              </p>
            );
          }
        })}
      </div>

      <div id='dashboard-messages-send'>
        <input
          placeholder='Enter Message Here'
          id='dashboard-message-input'
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
