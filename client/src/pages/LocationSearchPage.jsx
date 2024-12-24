import React, { useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import BASE_URL from "../config/config";

const LocationSearchPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(30); // Default radius in km
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const searchByLocation = () => {
    setLoading(true);
    setError("");
    setNoResultsMessage(""); // Reset the no results message

    axios
      .get(`${BASE_URL}/api/restaurants/search/locations?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
      .then((res) => {
        if (res.data.message === "No restaurants found in this location") {
          setNoResultsMessage("No restaurants found in this area. Try expanding the search radius.");
          setResults([]);
        } else {
          setResults(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch restaurants. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto my-12 px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Find the Best Restaurants Near You
      </h1>

      {/* Search Form */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-8 bg-white shadow-xl rounded-xl border-t-4 border-blue-500">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-6 md:mb-0">
          <div className="w-full md:w-1/4">
            <label htmlFor="latitude" className="text-sm font-medium text-gray-600 mb-2 block">
              Latitude
            </label>
            <input
              id="latitude"
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border p-4 rounded-lg shadow-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-1/4">
            <label htmlFor="longitude" className="text-sm font-medium text-gray-600 mb-2 block">
              Longitude
            </label>
            <input
              id="longitude"
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border p-4 rounded-lg shadow-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full md:w-1/4">
            <label htmlFor="radius" className="text-sm font-medium text-gray-600 mb-2 block">
              Radius (km)
            </label>
            <input
              id="radius"
              type="number"
              placeholder="Radius (km)"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="border p-4 rounded-lg shadow-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={searchByLocation}
          className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg mt-4 md:mt-0 hover:bg-blue-700 transition-all duration-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Messages */}
      {noResultsMessage && !loading && (
        <div className="bg-yellow-100 text-yellow-700 p-4 mb-6 rounded-md shadow-lg">
          <p>{noResultsMessage}</p>
          <button
            onClick={() => setRadius((prevRadius) => prevRadius * 2)} // Double the radius
            className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 transition-all duration-300"
          >
            Expand Search Radius
          </button>
        </div>
      )}

      {error && !noResultsMessage && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {results.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPage;
