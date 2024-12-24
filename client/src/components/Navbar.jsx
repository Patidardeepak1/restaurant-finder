import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold text-xl">
          Restaurant Finder
        </Link>
        <div>
          <Link to="/" className="text-gray-300 mx-2">Home</Link>
          <Link to="/location-search" className="text-gray-300 mx-2">Location Search</Link>
          <Link to="/image-search" className="text-gray-300 mx-2">Image Search</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
