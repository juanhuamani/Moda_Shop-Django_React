import { config } from "dotenv";

/*
    * Load environment variables from a .env file into process.env.
    * This allows for configuration of the application without hardcoding values.
    * The dotenv package is used to load these variables.
*/

config();

// Exporting configuration variables for the application
// These variables are used throughout the application to configure various settings.

export const PORT = process.env.PORT || 3000;

// Database configuration
// These variables are used to connect to the database.

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "password";
export const DB_NAME = process.env.DB_NAME || "database_name";


// JWT (JSON Web Token) configuration
// These variables are used for authentication and authorization in the application.
// JWT_SECRET is used to sign the tokens, and JWT_EXPIRES_IN defines the expiration time for the tokens.
// JWT_REFRESH_SECRET and JWT_REFRESH_EXPIRES_IN are used for refresh tokens.
// JWT_EXPIRES_IN is in minutes, so it's multiplied by 60 to convert to seconds.
// JWT_REFRESH_EXPIRES_IN is also in minutes, so it's multiplied by 60 to convert to seconds.

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN ) || 60;

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const JWT_REFRESH_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_EXPIRES_IN) || 10080;

// Frontend URL configuration
// This variable is used to configure CORS (Cross-Origin Resource Sharing) settings in the application.
// It defines the URL of the frontend application that is allowed to make requests to the backend API.
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const API_URL = process.env.API_URL || "http://localhost:3000/api/v1";
