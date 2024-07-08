import { Playlist } from "../models/playlist.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandle.js";

// ! create playlist
const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id,
    });
    if (!playlist) {
        throw new ApiError(500, "Failed to create playlist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

// ! update playlist
const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "Name and description are required");
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(400, "Playlist not found");
    }

    if (playlist?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(
            400,
            "You are not authorized to update this playlist"
        );
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlist?._id,
        {
            $set: {
                name,
                description,
            },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlaylist,
                "Playlist updated successfully"
            )
        );
});

// ! delete playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(400, "Playlist not found");
    }

    if (playlist?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only owner can delete this playlist");
    }
    await Playlist.findByIdAndDelete(playlist?._id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
});

export { createPlaylist, updatePlaylist, deletePlaylist };