/*
Landing page,
route: http://localhost:3000/

It searches the restaurant and displays the list of restaurants, in which we can
click to go to the specific restaurants.
*/

// Install React code snippet
// For creating functional component type, rfce
// Check other code snippets online : https://github.com/dsznajder/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
// import background from ".../public/homePicture.jpef";

// This will be the Home Page,
// User will land on this page when they first visit the site

const API_BASE = "http://localhost:9000";

function Home() {

  //Use state for storing the search inputs and results
  const[search, setSearch] = useState('');
  const[restaurants, setRestaurants] = useState([]);

  const searchRestaurants = async(e) => {
    e.preventDefault();
    const data = await fetch(API_BASE + `/search`);
    const items = await data.json();
    // console.log(items.message[0]._id);
    setRestaurants(items.message);
  }

  return( 
    <div style={{ 
      backgroundImage: "url(/images/homePicture.jpeg)",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
      opacity: '0.70'
      }}>

      <div className="search">
          <form >
            <label htmlFor = "searchRestaurant">Search Restaurants</label>
            <input 
                id = "searchRestaurant"
                type = "text"
                placeholder='Search by Name or location'
                value = {search}
                onChange={(e) => setSearch(e.target.value)}
                />

            <button onClick={searchRestaurants}> Search </button>
          </form>

        {restaurants.map(restaurant => (
          <div key = {restaurant._id} className = "restaurant-search-result">
              <Link to = {`/restaurant/${restaurant._id}` }>{restaurant.name} </Link>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Home;
