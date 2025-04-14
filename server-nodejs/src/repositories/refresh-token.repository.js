import RefreshToken from "../model/refresh-token.model.js";

/**
 * Repository class to manage Refresh Tokens for users.
 */

export class RefreshTokenRepository {
  /**
   * Saves a new refresh token for a user, replacing any existing token.
   *
   * This function first removes any existing refresh token for the given user and then
   * creates a new refresh token with the provided values.
   *
   * @param {string} userId - The ID of the user to associate with the refresh token.
   * @param {string} token - The refresh token string to save.
   * @param {Date} expiresAt - The expiration date of the refresh token.
   * @returns {Promise<object>} A promise that resolves to the newly created refresh token object.
   * @throws {Error} If there is an error during the token saving process.
   */

  async saveRefreshToken(userId, token, expiresAt) {
    try {
      await RefreshToken.destroy({
        where: { user_id: userId },
      });

      const newToken = await RefreshToken.create({
        user_id: userId,
        token: token,
        expires_at: expiresAt,
      });

      return newToken;
    } catch (error) {
      throw new Error(`Error saving refresh token: ${error.message}`);
    }
  }

  /**
   * Validates a given refresh token for a specific user.
   *
   * This function checks if the provided refresh token exists for the given user and
   * whether it has expired. If the token has expired, it is removed from the database.
   *
   * @param {string} userId - The ID of the user whose refresh token needs validation.
   * @param {string} token - The refresh token to validate.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the token is valid,
   *                            and `false` if the token is invalid or expired.
   * @throws {Error} If there is an error during the validation process.
   */

  async validateRefreshToken(userId, token) {
    try {
      const storedToken = await RefreshToken.findOne({
        where: {
          user_id: userId,
          token: token,
        },
      });

      if (!storedToken) {
        return false;
      }

      const now = new Date();
      if (storedToken.expires_at < now) {
        await storedToken.destroy();
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Error validating refresh token: ${error.message}`);
    }
  }

  /**
   * Deletes the refresh token for a specific user.
   *
   * This function removes the refresh token associated with the given user ID from the database.
   *
   * @param {string} userId - The ID of the user whose refresh token needs to be deleted.
   * @return {Promise<boolean>} A promise that resolves to `true` if the token was deleted successfully,
   *                            and `false` if no token was found for the user.
   * @throws {Error} If there is an error during the deletion process.
   */

  async deleteRefreshToken(userId) {
    try {
      const result = await RefreshToken.destroy({
        where: { user_id: userId },
      });

      return result > 0;
    } catch (error) {
      throw new Error(`Error deleting refresh token: ${error.message}`);
    }
  }
}
