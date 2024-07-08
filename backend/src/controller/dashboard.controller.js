import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { userId } = req.user?._id;

    const totalSubscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $group: {
                _id: null,
                subscribersCount: {
                    $sum: 1,
                },
            },
        },
    ]);

    const video = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes",
            },
        },
        {
            $project: {
                totalLikes: {
                    $size: "$likes",
                },
                totalViews: "$views",
                totalVideos: 1,
            },
        },
        {
            $group: {
                _id: null,
                totalLikes: {
                    $sum: "$totalLikes",
                },
                totalViews: {
                    $sum: "$totalViews",
                },
                totalVideos: {
                    $sum: 1,
                },
            },
        },
    ]);

    const channelStats = {
        totalSubscribers: totalSubscribers[0].subscribersCount,
        totalLikes: video[0].totalLikes,
        totalViews: video[0].totalViews,
        totalVideos: video[0].totalVideos,
    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                channelStats,
                "Channel stats fetched successfully"
            )
        );
});

export { getChannelStats };
