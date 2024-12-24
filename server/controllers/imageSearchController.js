import { recognizeFood } from "../utils/aiModel.js";
import Restaurant from "../models/RestaurantModel.js";

export const searchByImage = async (req, res) => {
  try {
    // Ensure an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    // Pass the image buffer to the recognition function
    const cuisines = await recognizeFood(req.file.buffer);

    if (!cuisines || cuisines === "NOT AVAILABLE") {
      return res.status(404).json({
        message: "Could not identify cuisine from the image.",
      });
    }

    // Query the database for restaurants serving the identified cuisine
    const restaurants = await Restaurant.find({ cuisines });

    res.status(200).json({
      cuisines,
      restaurants,
      message: restaurants.length
        ? `Found ${restaurants.length} restaurants serving ${cuisines}.`
        : `No restaurants found serving ${cuisines}.`,
    });
  } catch (error) {
    console.error("Error in searchByImage:", error.message);
    if (error.stack) console.error(error.stack);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};
