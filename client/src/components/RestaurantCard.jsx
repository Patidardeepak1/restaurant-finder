import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="relative border rounded-lg p-6 shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
   

      <h2 className="text-xl font-semibold text-gray-800">{restaurant.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{restaurant.cuisines}</p>
      <p className="text-gray-600 mt-2">Location: {restaurant.locality}</p>

      {/* View Details Link */}
      <div className="mt-4">
        <Link
          to={`/restaurant/${restaurant._id}`}
          className="text-blue-500 text-sm font-medium hover:text-blue-700 transition duration-200"
        >
          View Details
        </Link>
      </div>

      {/* Floating effect */}
      <div className="absolute top-0 right-0 p-2 text-gray-800 opacity-50 text-xs bg-gray-100 rounded-full">
        <span className="font-semibold">Rating:</span> {restaurant.aggregateRating}
      </div>
    </div>
  );
};

export default RestaurantCard;
