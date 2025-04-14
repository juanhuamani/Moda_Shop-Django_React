import User from "../model/users.model.js";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

import {
  NotFoundError,
  AuthError,
  ValidationError,
} from "../errors/customErrors.errors.js";
import { validatePassword } from "../utils/validators.js";

/**
 * Repository class for managing users in the database.
 */
export class UserRepository {
  /**
   * Finds all users in the database excluding the password field.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of user objects excluding passwords.
   */
  async findAll() {
    return await User.scope("withoutPassword").findAll();
  }

  /**
   * Finds a user by their ID.
   *
   * @param {string} id - The unique identifier of the user.
   * @returns {Promise<Object>} A promise that resolves to the user object, excluding the password field.
   * @throws {Error} If the user with the specified ID does not exist.
   */
  async findById(id) {
    const user = await User.scope("withoutPassword").findByPk(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  }

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email of the user.
   * @returns {Promise<Object>} A promise that resolves to the user object, excluding the password field.
   * @throws {Error} If the user with the specified email does not exist.
   */
  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new NotFoundError("Usuario no encontrado");
    return user;
  }

  /**
   * Creates a new user in the database after performing necessary validations.
   *
   * @param {Object} userData - The data to create a new user.
   * @param {string} userData.first_name - The user's first name.
   * @param {string} userData.last_name - The user's last name.
   * @param {string} userData.email - The user's email address.
   * @param {string} userData.password - The user's password.
   * @returns {Promise<Object>} A promise that resolves to the created user object, excluding the password field.
   * @throws {Error} If required fields are missing, data types are incorrect, or email already exists.
   */
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errorDetails = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        throw new ValidationError("Validation error", errorDetails);
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new ValidationError("Email already exists");
      }
      throw error;
    }
  }

  /**
   * Updates an existing user in the database.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {Object} userData - The data to update the user.
   * @returns {Promise<[number, Object[]]>} A promise that resolves to an array indicating the number of updated rows and the updated user data.
   * @throws {Error} If the user with the specified ID does not exist.
   */
  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");

    const allowedFields = ["first_name", "last_name", "avatar"];
    const invalidFields = Object.keys(userData).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new ValidationError(
        `Campos no permitidos: ${invalidFields.join(", ")}`
      );
    }

    try {
      await user.update(userData);
      return await User.scope("withoutPassword").findByPk(id);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(
          "Error de validación",
          error.errors.map((err) => err.message)
        );
      }
      throw error;
    }
  }
  /**
   * Deletes a user from the database.
   *
   * @param {string} id - The unique identifier of the user.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the user was successfully deleted, `false` otherwise.
   * @throws {Error} If the user with the specified ID does not exist.
   */
  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");

    await user.destroy();
    return true;
  }

  /**
   * Logs in a user by validating their email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} A promise that resolves to the user object, excluding the password field.
   * @throws {Error} If the user is not found or the password is incorrect.
   */
  async login(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Validate password
    const isValid = await user.validPassword(password);
    if (!isValid) throw new AuthError("Credenciales inválidas");

    // Return the user without password
    return User.scope("withoutPassword").findByPk(user.id);
  }

  /**
   * Updates the avatar of a user.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {string} avatar - The new avatar filename.
   * @returns {Promise<string>} A promise that resolves to the new avatar filename.
   * @throws {Error} If the user with the specified ID does not exist.
   */
  async updateAvatar(id, avatarFile) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");

    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    console.log(avatarFile);
    if (!validMimeTypes.includes(avatarFile.mimetype)) {
      throw new ValidationError("Formato de imagen no válido");
    }

    if (user.avatar && user.avatar !== "default-avatar.png") {
      const oldAvatarPath = path.join(
        process.cwd(),
        "uploads/avatars",
        user.avatar
      );

      await fs.unlink(oldAvatarPath).catch(() => {});
    }

    await user.update({ avatar: avatarFile.filename });
    return User.scope("withoutPassword").findByPk(id);
  }

  /**
   * Changes the password of a user.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {string} newPassword - The new password for the user.
   * @returns {Promise<void>} A promise that resolves when the password is successfully changed.
   * @throws {Error} If the user with the specified ID does not exist or if the password is invalid.
   */
  async changePassword(id, currentPassword, newPassword) {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("Usuario no encontrado");

    const isValid = user.validPassword(currentPassword);
    if (!isValid) throw new AuthError("Contraseña actual incorrecta");

    if (!validatePassword(newPassword)) {
      throw new ValidationError("La nueva contraseña no cumple los requisitos");
    }

    await user.update({ password: newPassword });
    return true;
  }
}

User.addScope("withoutPassword", {
  attributes: { exclude: ["password"] },
});
