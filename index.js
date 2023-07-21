import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js";
import hotelsRoute from  "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import authRoute from "./routes/auth.js";


dotenv.config({ path: ".env" });

const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database connected");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
})

//middlewares 
app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/hotels", hotelsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: err,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(process.env.PORT, () => {
    connect();
    console.log(`Server is running on port: ${process.env.PORT}`)
});   