import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controller/comment.controller.js";
const router = Router();

router.use(verifyJWT, upload.none()); // apply middleware to all routes

router.route("/:videoId").get(getVideoComments).post(addComment); // Route for handling comments on a specific video
router.route("/c/commentId").delete(deleteComment).patch(updateComment); //Route for handling specific comment operations (delete and update)

export default router;
