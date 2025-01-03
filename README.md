# Restaurant Finder

The **Restaurant Finder** is a web application that allows users to search for restaurants based on location, cuisine, and other details. The app provides detailed information about each restaurant, including its name, address, rating, price range, and a map with the restaurant's location. It is built using the MERN stack (MongoDB, Express, React, Node.js) and integrates Google Maps for location-based features.

Additionally, the app features an **Image Search Functionality**, where users can upload an image of food, and AI identifies the cuisine and displays a list of related restaurants.

## Features

- **Restaurant Search**: Users can search for restaurants based on different criteria, such as name, cuisine, or location.
- **Restaurant Details**: Each restaurant page displays detailed information, including:
  - Name, address, and cuisine type
  - Average cost for two
  - Rating and votes
  - Price range
  - Availability of table booking and online delivery
- **Google Maps Integration**: Each restaurant has a location displayed on Google Maps with a marker for the restaurant's coordinates.
- **Image Search**: Users can upload an image of food, and AI will identify the cuisine and display related restaurants serving that cuisine.
- **Responsive Design**: The application is designed to be fully responsive, ensuring a seamless experience across devices.

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - React Google Maps API
  - React Router
  - Axios (for API calls)
- **Backend**:
  - Node.js with Express.js
  - MongoDB (NoSQL Database)
- **API**:
  - RESTful API for restaurant data and Google Maps integration
- **AI Integration**:
  - AI service for identifying food cuisine based on image uploads (using Google Vision API, TensorFlow, or a similar service)

## Image Search Functionality

1. **AI-based Cuisine Identification**: When users upload an image of food, the system uses AI algorithms (such as Google Vision or TensorFlow) to identify the cuisine in the image.
2. **Related Restaurant Listing**: Once the cuisine is identified, the app queries the database and displays a list of restaurants serving that cuisine.

### Steps to use Image Search:

1. Navigate to the **Image Search** page.
2. Upload an image of food.
3. The system will process the image and identify the cuisine.
4. A list of restaurants that serve the identified cuisine will be displayed.

## Installation

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas cluster)
- An AI service (Google Vision API, TensorFlow, etc.) for cuisine identification (optional, based on implementation)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/restaurant-finder.git
   cd restaurant-finder
   ```
