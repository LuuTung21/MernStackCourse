import express from "express"
import dotenv from "dotenv"
// This configuration helps connect to the .env file.
dotenv.config();
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middlerWare/errorMiddleware.js"
import connectDB from "./config/db.js"

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Server is ready")
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});