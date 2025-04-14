import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config.js';
import { Sequelize} from "sequelize";

/**
 * * Database connection
 * * @class sequelize
 * * This class is used to connect to the MySQL database using Sequelize ORM.
 * * * It includes the following properties:
 * * * - host: The hostname of the database server.
 * * * - database: The name of the database to connect to.
 * * * - username: The username to use for authentication.
 * * * - password: The password to use for authentication.
 * * * - dialect: The type of database being used (MySQL in this case).
 * * * - logging: A boolean indicating whether to log SQL queries to the console.
 * * * The class is used to create a connection to the database and perform CRUD operations on the data.
 */

const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: "mysql",
  logging: false,
});

export default sequelize;