// Importing necessary packages

// Express: Web server framework
import express from 'express';

// Node's built-in HTTP module (needed for WebSockets)
import http from 'http';

// Socket.IO server for real-time communication
import { Server } from 'socket.io';

// CORS: Allows frontend running on a different port to access backend
import CORS from 'cors';

import router from './routes/router.js';

// Loads variables from the .env file

import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Enable CORS middleware
// app.use(cors(corsOptions));
app.use(
  CORS({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// Allow Express to parse incoming JSON data
app.use(express.json());

// Define port where your server will run
const port = 3001;

// Create an HTTP server and pass in your Express app
const server = http.createServer(app);

// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // FIXED typo: 'httos' → 'http'
    methods: ['GET', 'POST', 'DELETE'], // Allow frontend to make GET/POST requests
  },
});

// In-memory store for messages (optional - used for testing/demo)
let messageHistory = [];

//Routes
app.use('/api', router);

// Add a basic GET / route for browser testing
app.get('/', (req, res) => {
  res.send('✅ flaimethrower ChatBot backend is running!');
});

// Listen for new WebSocket connections from clients
io.on('connection', (socket) => {
  console.log('A new user connected:', socket.id);

  // Send a welcome message to the newly connected client
  socket.emit('receive_message', {
    sender: 'bot',
    content: 'Welcome to flaimethrower ChatBot!',
  });

  // Listen for messages sent by the client
  socket.on('send_message', (data) => {
    const { content } = data; // Extract message text

    // Create a user message object
    const userMessage = {
      sender: 'user',
      content,
    };

    // Save it to the in-memory message store
    messageHistory.push(userMessage);

    // Send the message back to the client as confirmation
    io.to(socket.id).emit('receive_message', userMessage);

    // Create a fake bot reply (just echoes the message)
    const botMessage = {
      sender: 'bot',
      content: `Echo: ${content}`,
    };

    // Add bot message to message history
    messageHistory.push(botMessage);

    // Send the bot's reply after a 1-second delay
    setTimeout(() => {
      io.to(socket.id).emit('receive_message', botMessage);
    }, 1000);
  });

  // Log when the user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
