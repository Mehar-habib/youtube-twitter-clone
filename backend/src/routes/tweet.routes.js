import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controller/tweet.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.use(verifyJWT, upload.none());

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
