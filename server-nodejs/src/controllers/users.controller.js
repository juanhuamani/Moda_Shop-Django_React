import { UserRepository } from "../repositories/users.repository.js";
import { API_URL } from "../config.js";

const userRepository = new UserRepository();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res
      .status(200)
      .json({
        ok: true,
        status: 200,
        message: "Users retrieved successfully",
        users,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userRepository.findById(id);
    res
      .status(200)
      .json({
        ok: true,
        status: 200,
        message: "User retrieved successfully",
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userRepository.create({ name, email, password });
    res
      .status(201)
      .json({
        ok: true,
        status: 201,
        message: "User created successfully",
        user,
      });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: error.message,
        errors: error.details || []
      });
    }
    console.error(error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Internal server error"
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await userRepository.update(id, { name, email });
    res
      .status(200)
      .json({
        ok: true,
        status: 200,
        message: "User updated successfully",
        user: user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userRepository.delete(id);
    res
      .status(200)
      .json({ ok: true, status: 200, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    await userRepository.updateAvatar(
      req.user.id,
      req.file
    );
    res
      .status(200)
      .json({
        ok: true,
        status: 200,
        message: "Avatar updated successfully",
        avatar: `${API_URL}/avatars/${req.file.filename}`
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
    try {
        const user = await userRepository.findById(req.user.id);
        res.status(200).json({
        ok: true,
        status: 200,
        message: "User retrieved successfully",
        user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    try {
        const user = await userRepository.changePassword(req.user.id, password, newPassword);
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Password changed successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}