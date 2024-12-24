import React, { useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import BASE_URL from "../config/config";

const ImageSearchPage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]); // List of restaurants
  const [cuisines, setCuisines] = useState([]); // List of recognized cuisines
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const searchByImage = () => {
    if (!file) {
      setError("Please upload an image.");
      return;
    }

    setLoading(true);
    setError("");
    setCuisines([]);
    setResults([]);

    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(`${BASE_URL}/api/restaurants/image-search`, formData)
      .then((res) => {
        if (res.data.cuisine) {
          // Split the detected cuisines into an array
          const detectedCuisines = res.data.cuisine.split(",").map((c) => c.trim());
          setCuisines(detectedCuisines);
        }
        if (res.data.restaurants) {
          setResults(res.data.restaurants); // Set restaurant results
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to process the image. Please try again.");
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Search Restaurants by Cuisine Image</h1>

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-md w-full max-w-sm"
      />

      {/* Search Button */}
      <button
        onClick={searchByImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-md shadow-lg">
          {error}
        </div>
      )}

      {/* Detected Cuisines */}
      {cuisines.length > 0 && (
        <div className="bg-green-100 text-green-700 p-4 mt-4 rounded-md shadow-lg">
          <p>Recognized Cuisines:</p>
          <ul className="list-disc list-inside">
            {cuisines.map((cuisine, index) => (
              <li key={index} className="font-semibold">{cuisine}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Restaurant Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {results.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {/* No Results Message */}
      {results.length === 0 && !loading && !error && cuisines.length > 0 && (
        <div className="text-gray-500 mt-4">
          No restaurants found for the recognized cuisines. Try another image!
        </div>
      )}
    </div>
  );
};

export default ImageSearchPage;
