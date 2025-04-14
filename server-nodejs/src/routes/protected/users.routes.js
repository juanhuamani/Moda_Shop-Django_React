import { Router } from "express";
import { createUser, deleteUser, getUserById, getAllUsers, updateUser, updateAvatar, getUser, changePassword } from "../../controllers/users.controller.js";
import { avatarUpload } from "../../utils/fileUpload.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/me", getUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put('/avatar', avatarUpload, updateAvatar);

router.put("/:id", updateUser);

router.post("/change-password", changePassword);

export default router;