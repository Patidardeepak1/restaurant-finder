# Restaurant Finder

The **Restaurant Finder** is a web application that allows users to search for restaurants based on location, cuisine, and other details. The app provides detailed information about each restaurant, including its name, address, rating, price range, and a map with the restaurant's location. It is built using the MERN stack (MongoDB, Express, React, Node.js) and integrates Google Maps for location-based features.

## Features

- **Restaurant Search**: Users can search for restaurants based on different criteria, such as name, cuisine, or location.
- **Restaurant Details**: Each restaurant page displays detailed information, including:
  - Name, address, and cuisine type
  - Average cost for two
  - Rating and votes
  - Price range
  - Availability of table booking and online delivery
- **Google Maps Integration**: Each restaurant has a location displayed on Google Maps with a marker for the restaurant's coordinates.
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

## Installation

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas cluster)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/restaurant-finder.git
   cd restaurant-finder
   ```
