import Restaurant from "../models/RestaurantModel.js";

// Get all restaurants with pagination
export const getRestaurants = async (req, res) => {
  const { cuisine, location, page = 1, limit = 12 } = req.query;

  try {
    const filterCriteria = {};

    if (cuisine) {
      filterCriteria.cuisines = { $regex: new RegExp(cuisine, "i") }; // Case-insensitive search for cuisine
    }

    if (location) {
      filterCriteria.city = { $regex: new RegExp(location, "i") }; // Case-insensitive search for location
    }

    const restaurants = await Restaurant.find(filterCriteria)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Restaurant.countDocuments(filterCriteria);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      restaurants,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const searchByLocation = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;

    // Validate query parameters
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({
        message: "Missing query parameters: latitude, longitude, or radius",
      });
    }

    // Parse and validate the parameters
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    let rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
      return res.status(400).json({ message: "Invalid query parameters" });
    }

    // Convert radius (km) to degrees (Earth's radius = 6371 km)
    const earthRadius = 6371; // Earth's radius in km
    const radInDegrees = (rad / earthRadius) * (180 / Math.PI);

    // Calculate bounding box
    const maxLat = lat + radInDegrees;
    const minLat = lat - radInDegrees;
    const maxLon = lon + radInDegrees / Math.cos((lat * Math.PI) / 180);
    const minLon = lon - radInDegrees / Math.cos((lat * Math.PI) / 180);

    // Search for restaurants within the bounding box
    let restaurants = await Restaurant.find({
      latitude: { $gte: minLat, $lte: maxLat },
      longitude: { $gte: minLon, $lte: maxLon },
    });

    // If no results, expand the radius and retry (up to a max radius of 50 km)
    if (restaurants.length === 0) {
      //console.log("No results found. Expanding search radius...");
      const maxRadius = 50000; // Maximum radius in km
      while (restaurants.length === 0 && rad <= maxRadius) {
        rad *= 2; // Double the radius
        const newRadInDegrees = (rad / earthRadius) * (180 / Math.PI);
        const newMaxLat = lat + newRadInDegrees;
        const newMinLat = lat - newRadInDegrees;
        const newMaxLon =
          lon + newRadInDegrees / Math.cos((lat * Math.PI) / 180);
        const newMinLon =
          lon - newRadInDegrees / Math.cos((lat * Math.PI) / 180);

        restaurants = await Restaurant.find({
          latitude: { $gte: newMinLat, $lte: newMaxLat },
          longitude: { $gte: newMinLon, $lte: newMaxLon },
        });

        if (rad > maxRadius) break; // Stop retrying if radius exceeds max limit
      }
    }

    // If still no results, return a 404 with a meaningful message
    if (restaurants.length === 0) {
      return res.status(404).json({
        message: "No restaurants found in this location",
      });
    }

    // Return found restaurants
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants by location:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Fetch all cuisines
export const getCuisines = async (req, res) => {
  try {
    // Fetch distinct cuisines and split them into arrays
    const cuisinesList = await Restaurant.distinct("cuisines");
    // Flatten and remove duplicates, assuming cuisines are comma-separated strings
    const cuisines = [
      ...new Set(
        cuisinesList.flatMap((cuisine) =>
          cuisine.split(",").map((c) => c.trim())
        )
      ),
    ];
    res.status(200).json(cuisines.sort()); // Optionally sort alphabetically
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Fetch all locations (cities)
export const getLocations = async (req, res) => {
  try {
    const locations = await Restaurant.distinct("city");
    res.status(200).json(locations.sort()); // Sort alphabetically for cleaner output
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
