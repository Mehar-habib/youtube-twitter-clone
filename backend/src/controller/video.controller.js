import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import ApiResponse from "../utils/ApiResponse.js";

// !get all videos based on query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

    const pipeline = [];

    // Check if a search query is provided
    if (query) {
        // Add a $search stage to the pipeline for full-text search
        pipeline.push({
            $search: {
                index: "search-videos", // Name of the search index
                text: {
                    query: query, // The search query
                    path: ["title", "description"], // Fields to search
                },
            },
        });
    }
    // check if user id is provided
    if (userId) {
        // validate if user id is valid
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user id");
        }
        // Add a $match stage to filter videos by the owner (userId)
        pipeline.push({
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        });
    }
    // fetch videos only that are set isPublished as true
    pipeline.push({ $match: { isPublished: true } });

    //sortBy can be views, createdAt, duration
    //sortType can be ascending(-1) or descending(1)
    if (sortBy && sortType) {
        // add a $sort stage to sort the videos
        pipeline.push({
            $sort: {
                [sortBy]: sortType === "asc" ? 1 : -1,
            },
        });
    } else {
        pipeline.push({ $sort: { createdAt: -1 } });
    }

    const videoAggregate = Video.aggregate(pipeline);

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    };

    const video = await Video.aggregatePaginate(videoAggregate, options);
    return res
        .status(200)
        .json(new ApiResponse(200, video, "Videos fetched successfully"));
});

export { getAllVideos };
