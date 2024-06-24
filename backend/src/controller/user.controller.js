import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token."
        );
    }
};

// ! register controller
const registerUser = asyncHandler(async (req, res, next) => {
    // get user details from frontend
    // validation - not empty etc...
    // check if user already exists: username, email
    // check for images, avatar
    // upload to cloudinary, avatar check
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const { username, email, password, fullName } = req.body;

    if (
        [username, email, password, fullName].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const exist = await User.findOne({ $or: [{ username }, { email }] });
    if (exist) {
        throw new ApiError(400, "user with username or email already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar and cover image is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password,
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(500, "User registration failed, please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

// ! login controller
const loginUser = asyncHandler(async (req, res, next) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send tokens in cookies

    const { email, password, username } = req.body;
    if (!(email || username)) {
        throw new ApiError(400, "Email or username is required");
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

export { registerUser, loginUser };
