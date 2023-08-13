import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"

// @Desc Auth User/set Token
// Route Post /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    };
});

// @Desc Register a new user
// Route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    };

    const newUser = await User.create({
        name,
        email,
        password
    });

    if (newUser) {
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    };
});

// @Desc Logout User
// Route Post /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    // This deletes the current cookie data.
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: "User Logged Out" });
});

// @Desc Get user profile
// Route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile" });
});

// @Desc Update user profile
// Route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler((req, res) => {
    res.status(200).json({ message: "Update user profile" });
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};