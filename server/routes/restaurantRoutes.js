import express from "express";
import multer from "multer";

import {
  getRestaurants,
  getRestaurantById,
  searchByLocation,
  getCuisines,
  getLocations,
} from "../controllers/restaurantController.js";
import { searchByImage } from "../controllers/imageSearchController.js";

const storage = multer.memoryStorage();

// Initialize Multer with the custom storage
const upload = multer({ storage });

// Set up the Express router
const router = express.Router();

// Route to get all cuisines
router.get("/cuisines", getCuisines);

// Route to get all locations
router.get("/locations", getLocations);

// Route to get all restaurants
router.get("/", getRestaurants);

// Route to get restaurant by ID
router.get("/:id", getRestaurantById);

// Route to search restaurants by location
router.get("/search/locations", searchByLocation);

// Route to search restaurants by image (with file upload)
router.post("/image-search", upload.single("image"), searchByImage);

export default router;
