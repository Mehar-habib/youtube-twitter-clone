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

export { toggleVideoLike };
