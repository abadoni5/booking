import express from "express";
import Hotel from "../models/hotel.js";
import { handleError } from "../utils/error.js";

const router = express.Router();

// CREATE -- POST 
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// READ  -- GET
router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// READ ALL -- GET ALL
router.get("/", async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
    }
    catch (err) {
        next(err)
    }
})

// UPDATE -- UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// DELETE -- DELETE 
router.delete("/:id", async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }
    catch (err) {
        res.status(500).json(err);
    }
})

export default router;   