import express from "express";
const router = express.Router();

router.get("/rooms", (req, res) => {
    res.send("Rooms");
})

export default router;