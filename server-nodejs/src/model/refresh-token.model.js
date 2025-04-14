import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

/**
 * * RefreshToken model
 * * @class RefreshToken
 * * @extends Model
 * * @property {number} id - The unique identifier for the refresh token.
 * * * @property {number} user_id - The ID of the user associated with the refresh token.
 * * * @property {string} token - The refresh token string.
 * * * @property {Date} expires_at - The expiration date and time of the refresh token.
 * * * This model represents the refresh tokens used for user authentication.
 * * * It includes the following fields:
 * * * - id: The unique identifier for the refresh token.
 * * * - user_id: The ID of the user associated with the refresh token.
 * * * - token: The refresh token string.
 * * * - expires_at: The expiration date and time of the refresh token.
 * * * The model is defined using Sequelize ORM and includes the following methods:
 * * * - init: Initializes the model with the specified attributes and options.
 * * * - sequelize: The Sequelize instance used to connect to the database.
 * * * The model is used to store and manage refresh tokens for user authentication.
    * * It includes methods for creating, updating, and deleting refresh tokens.
*/

class RefreshToken extends Model {}

RefreshToken.init(
    {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        token: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      }, {
        sequelize,
        timestamps: false,
        tableName: "refresh_tokens",
      }
);

export default RefreshToken;
