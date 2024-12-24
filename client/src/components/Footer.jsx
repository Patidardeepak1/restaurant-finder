import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/location-search" className="hover:text-white">
            Location Search
          </Link>
          <Link to="/image-search" className="hover:text-white">
            Image Search
          </Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Restaurant Finder. All rights reserved.
        </p>
        <p className="text-sm">
          Built with ❤️ by <span className="font-bold text-white">Deepak Patidar</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
