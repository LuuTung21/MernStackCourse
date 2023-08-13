import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // The userId is the payload part that we pass them into the token when creating the token.
            // The select method allows us to seleect every information from the object except the password information
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token.")
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.")
    }
});

export { protect };
