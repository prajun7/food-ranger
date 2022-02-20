import React from 'react';
import './App.css';

import NavBar from './components/navBar/NavBar';
import AboutUs from './components/pages/aboutUs/AboutUs';
import Home from './components/pages/home/Home';
import LogIn from './components/pages/logIn/LogIn';
import SignUp from './components/pages/signUp/SignUp';
import ForgotPassword from './components/pages/forgotPassword/ForgotPassword';
import RestaurantDetails from './components/pages/restaurantDetails/RestaurantDetails';
import Restaurants from './components/pages/restaurantDetails/Restaurants';
import UserProfile from './components/pages/userProfile/UserProfile';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

import UserContextProvider from './contexts/UserContext';

// App.js is our main component that holds all other components.

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <NavBar />
            {/* NavBar component is outside the Switch, so that nav will be present in every page */}
              <Switch>
                <Route path = "/aboutus" component = {AboutUs} />
                <Route path = "/" exact component ={Home} />
                <Route path = "/login" component = {LogIn} />
                <Route path = "/signup" component = {SignUp} />
                <Route path = "/forgotpassword" component = {ForgotPassword} />
                <Route path = "/restaurant/:name" component = {RestaurantDetails} />
                <Route path = "/restaurants" component = {Restaurants} />
                <Route path = "/user" exact component = {UserProfile} />
              </Switch>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
