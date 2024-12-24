import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Restaurant from "../models/RestaurantModel.js"; // Adjust the path as needed
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Function to upload data
const uploadData = () => {
  const results = [];

  fs.createReadStream("data/zomato.csv") // Update the path to your CSV file
    .pipe(csv())
    .on("data", (row) => {
      results.push(row);
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");

      // Loop through each row in the CSV and insert it into MongoDB
      for (const row of results) {
        try {
          const restaurant = new Restaurant({
            restaurantID: row["Restaurant ID"],
            name: row["Restaurant Name"],
            countryCode: parseInt(row["Country Code"]),
            city: row["City"],
            address: row["Address"],
            locality: row["Locality"],
            localityVerbose: row["Locality Verbose"],
            longitude: parseFloat(row["Longitude"]),
            latitude: parseFloat(row["Latitude"]),
            cuisines: row["Cuisines"],
            averageCostForTwo: parseInt(row["Average Cost for two"]),
            currency: row["Currency"],
            hasTableBooking: row["Has Table booking"] === "Yes",
            hasOnlineDelivery: row["Has Online delivery"] === "Yes",
            isDeliveringNow: row["Is delivering now"] === "Yes",
            switchToOrderMenu: row["Switch to order menu"] === "Yes",
            priceRange: parseInt(row["Price range"]),
            aggregateRating: parseFloat(row["Aggregate rating"]),
            ratingColor: row["Rating color"],
            ratingText: row["Rating text"],
            votes: parseInt(row["Votes"]),
          });

          await restaurant.save();
          console.log(`Restaurant ${restaurant.name} saved to database.`);
        } catch (err) {
          console.error("Error saving restaurant:", err);
        }
      }

      mongoose.connection.close();
      console.log("Data upload complete");
    });
};

// Call the upload function
uploadData();
