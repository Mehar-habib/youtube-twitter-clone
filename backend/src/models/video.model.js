import mongoose, { model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: {
                url: String, // cloudinary
                public_id: String,
            },
            required: [true, "Video file is required"],
        },
        thumbnail: {
            type: {
                url: String, // cloudinary
                public_id: String,
            },
            required: [true, "Thumbnail is required"],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = model("Video", videoSchema);
