import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config/config";
import { FaCheck, FaTimes, FaUtensils, FaMapMarkerAlt } from "react-icons/fa"; 
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Import the required components

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="container mx-auto my-8 px-4">
      {/* Restaurant Header */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{restaurant.name}</h1>
        <p className="text-xl font-semibold text-gray-600">{restaurant.cuisines}</p>
        <p className="text-lg text-gray-500">{restaurant.localityVerbose}</p>
      </div>

      {/* Restaurant Detail Card */}
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto space-y-6">
        {/* Restaurant Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Restaurant Details</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <FaUtensils className="text-xl mr-2" />
              <span>
                <strong>Cuisines:</strong> {restaurant.cuisines}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="text-xl mr-2" />
              <span>
                <strong>Address:</strong> {restaurant.address}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <strong>Average Cost for Two:</strong> {restaurant.currency}{" "}
              {restaurant.averageCostForTwo}
            </div>
            <div className="flex items-center text-gray-600">
              <strong>Rating:</strong> {restaurant.aggregateRating} ({restaurant.ratingText})
            </div>
            <div className="flex items-center text-gray-600">
              <strong>Votes:</strong> {restaurant.votes}
            </div>
            <div className="flex items-center text-gray-600">
              <strong>Price Range:</strong> {restaurant.priceRange}
            </div>

            {/* Table Booking and Online Delivery */}
            <div className="flex items-center text-gray-600">
              <strong>Has Table Booking:</strong>{" "}
              {restaurant.hasTableBooking ? (
                <FaCheck className="text-green-500 ml-2" />
              ) : (
                <FaTimes className="text-red-500 ml-2" />
              )}
            </div>
            <div className="flex items-center text-gray-600">
              <strong>Has Online Delivery:</strong>{" "}
              {restaurant.hasOnlineDelivery ? (
                <FaCheck className="text-green-500 ml-2" />
              ) : (
                <FaTimes className="text-red-500 ml-2" />
              )}
            </div>
          </div>
        </div>

        {/* Latitude and Longitude */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Location Coordinates</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Latitude:</strong> {restaurant.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {restaurant.longitude}
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Location</h3>
          <p className="text-gray-600">
            <strong>Location:</strong> {restaurant.localityVerbose}
          </p>
          <div className="w-full h-64 bg-gray-200 mt-4 rounded-md">
            <LoadScript googleMapsApiKey="AIzaSyBgNiDrnbhmB_TkBPNYpRglo5PyqUzDWqE">
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={{
                  lat: parseFloat(restaurant.latitude),
                  lng: parseFloat(restaurant.longitude),
                }}
                zoom={14}
              >
                <Marker
                  position={{
                    lat: parseFloat(restaurant.latitude),
                    lng: parseFloat(restaurant.longitude),
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
