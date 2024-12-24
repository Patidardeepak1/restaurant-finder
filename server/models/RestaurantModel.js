import mongoose from "mongoose";

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  restaurantID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  localityVerbose: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  cuisines: {
    type: String, // Can be an array of cuisines, but we'll store it as a string here
    required: true,
  },
  averageCostForTwo: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  hasTableBooking: {
    type: Boolean,
    required: true,
  },
  hasOnlineDelivery: {
    type: Boolean,
    required: true,
  },
  isDeliveringNow: {
    type: Boolean,
    required: true,
  },
  switchToOrderMenu: {
    type: Boolean,
    required: true,
  },
  priceRange: {
    type: Number,
    required: true,
  },
  aggregateRating: {
    type: Number,
    required: true,
  },
  ratingColor: {
    type: String,
    required: true,
  },
  ratingText: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
