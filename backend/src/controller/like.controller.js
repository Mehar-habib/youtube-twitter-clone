import { isValidObjectId } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Like } from "../models/like.model.js";
import ApiResponse from "../utils/ApiResponse.js";

// ! toggle video like
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }
    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Video unliked successfully"));
    }
    await Like.create({
        video: videoId,
        likedBy: req.user._id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "Video liked successfully"));
});

// ! toggle comment like
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }
    const likedAlready = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id,
    });
    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready?._id);

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Comment unliked successfully"));
    }
    await Like.create({
        comment: commentId,
        likedBy: req.user._id,
    });
    return res
        .status(200)
        .json(new ApiResponse(200, "Comment liked successfully"));
});

// ! toggle tweet like
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }
    const likedAlready = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id,
    });
    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready?._id);
        return res
            .status(200)
            .json(new ApiResponse(200, "Tweet unliked successfully"));
    }
    await Like.create({
        tweet: tweetId,
        likedBy: req.user._id,
    });
    return res
        .status(200)
        .json(new ApiResponse(200, "Tweet liked successfully"));
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike };
