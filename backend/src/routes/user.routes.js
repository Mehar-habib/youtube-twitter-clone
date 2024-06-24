import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser
);
router.route("/login").post(upload.none(), loginUser);

export default router;
