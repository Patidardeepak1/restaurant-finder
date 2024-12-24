import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import BASE_URL from "../config/config";

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    cuisine: "",
    location: "",
  });
  const limit = 12;

  useEffect(() => {
    // Fetch cuisines and locations
    axios
      .get(`${BASE_URL}/api/restaurants/cuisines`)
      .then((res) => setCuisines(res.data))
      .catch((err) => console.error("Error fetching cuisines:", err));

    axios
      .get(`${BASE_URL}/api/restaurants/locations`)
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  useEffect(() => {
    // Building the query string for filters
    const filterQuery = new URLSearchParams(filters).toString();
    axios
      .get(`${BASE_URL}/api/restaurants?page=${page}&limit=${limit}&${filterQuery}`)
      .then((res) => {
        setRestaurants(res.data.restaurants);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page, filters]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Restaurant Finder</h1>

      <div className="flex justify-between mb-6">
        {/* Cuisine Filter */}
        <div className="flex items-center">
          <label htmlFor="cuisine" className="mr-2">Cuisine:</label>
          <select
            id="cuisine"
            name="cuisine"
            value={filters.cuisine}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All</option>
            {cuisines.map((cuisine, index) => (
              <option key={index} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center">
          <label htmlFor="location" className="mr-2">Location:</label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantListPage;
