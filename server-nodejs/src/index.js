import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT, FRONTEND_URL } from './config.js';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth/index.js';
import protectedRoutes from './routes/protected/index.js';
// import publicRoutes from './routes/public'; // Uncomment if public routes are required

import { authenticate } from './middlewares/auth.js';

const app = express();
const port = PORT || 3000;  // Set the port from the configuration, defaulting to 3000

const avatarsDir = path.join(process.cwd(), 'uploads/avatars');
app.use('/avatars', express.static(avatarsDir));

// CORS (Cross-Origin Resource Sharing) middleware configuration
// Defines which origins, methods, and headers are allowed for incoming requests.
app.use(cors({
  origin: FRONTEND_URL,  // Allows requests only from the configured frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allows cookies to be sent with requests
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers for incoming requests
}));

// Middleware to parse the body of incoming requests as JSON
// This is necessary to handle data sent in the request body as JSON format.
app.use(express.json());  

// Middleware to parse cookies from incoming requests.
// This is useful for managing authentication and session handling through cookies.
app.use(cookieParser());  

// Defining the application's routes

// Authentication routes (login, registration, refresh tokens, etc.)
// These routes handle all user authentication-related processes.
app.use('/auth', authRoutes);

// Protected routes requiring authentication
// Authentication is verified through the `authenticate` middleware, ensuring
// that only authenticated users can access these resources.
app.use('/api', authenticate, protectedRoutes);

// Starting the server and listening on the specified port
// The server starts listening on the configured port, and a message is logged to the console
// to indicate that the server is up and running.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);  // Console confirmation that the server is active
});
