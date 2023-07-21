import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels } from "../controllers/hotelController.js";

const router = express.Router();

// CREATE -- POST 
router.post("/", createHotel);

// READ  -- GET
router.get("/:id", getHotel)

// READ ALL -- GET ALL
router.get("/", getAllHotels)

// UPDATE -- UPDATE
router.put("/:id", updateHotel)

// DELETE -- DELETE 
router.delete("/:id", deleteHotel)

export default router;   