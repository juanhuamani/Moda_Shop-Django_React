import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import bcrypt from "bcryptjs";

/**
 * * User model
 * * @class User
 * * * @extends Model
 * * * @property {number} id - The unique identifier for the user.
 * * * * @property {string} first_name - The user's first name.
 * * * * @property {string} last_name - The user's last name.
 * * * * @property {string} email - The user's email address.
 * * * * @property {string} password - The user's password.
 * * * * @property {string} avatar - The user's avatar image.
 * * * * This model represents the users in the system.
 * * * * It includes the following fields:
 * * * * - id: The unique identifier for the user.
 * * * * - first_name: The user's first name.
 * * * * - last_name: The user's last name.
 * * * * - email: The user's email address.
 * * * * - password: The user's password.
 * * * * The model is defined using Sequelize ORM and includes the following methods:
 * * * * - init: Initializes the model with the specified attributes and options.
 * * * * - sequelize: The Sequelize instance used to connect to the database.
 * * * * The model is used to store and manage user information in the system.
 */

class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
        len: {
          args: [2, 50],
          msg: "El nombre debe tener entre 2 y 50 caracteres",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El apellido es obligatorio" },
        len: {
          args: [2, 50],
          msg: "El apellido debe tener entre 2 y 50 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: "email",
        msg: "El email ya está registrado",
      },
      validate: {
        isEmail: { msg: "Formato de email inválido" },
        notEmpty: { msg: "El email es obligatorio" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La contraseña es obligatoria" },
        isStrongPassword: {
          msg: "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
        },
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: "default-avatar.png",
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;