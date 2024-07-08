import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleTSubscription,
} from "../controller/subscription.controller.js";

const router = Router();
router.use(verifyJWT);

router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleTSubscription);
router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router;
