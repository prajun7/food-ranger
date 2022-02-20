/*
User ptofile page, which displays the user inforamtion after they are logged in
So, we are getting logged in user's information from the context
*/

import React, { useState , useContext, useEffect} from 'react';

// UseHistory for sending the user to the specific restaurant page after they create their own restaurant
import { useHistory } from "react-router-dom";
import { UserContext } from '../../../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';  
import './UserProfile.css';

const API_BASE = "http://localhost:9000";

function UserProfile() {

  // Using Context to get the user infomations and checking if user is logged in or not
  // We need loggedIn and user information from the Context
  const {loggedIn, user, setRestaurantCreated, setNewRestaurant} = useContext(UserContext);

  // Use state to store the orders and reviews of the specific user
  const [orders,setOrders] = useState([]);
  const [reviews,setReviews] = useState([]);

  const[error, setError] = useState(null);

  // Use state for creating a new restaurant
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [newRestaurantEmail, setNewRestaurantEmail] = useState("");
  const [newRestaurantArea, setNewRestaurantArea] = useState("");

  const history = useHistory();  //Must include this line, using the History


  useEffect(() => {
    // console.log(match.params.name);  Gives the id of the restaurant

      fetchUserOrder();
      fetchUserRestaurants();

  }, []);

    //fetches the user's orders
    const fetchUserOrder = async () => {
      const data = await fetch(
        `${API_BASE}/users/${user._id}/orders`
      );
      const orders = await data.json();
      // console.log(restaurant.message);
      setOrders(orders.message);
    };

    //fetches the user's reviews
    const fetchUserRestaurants = async () => {
      const data = await fetch(
        `${API_BASE}/users/${user._id}/reviews`
      );
      const reviews = await data.json();
      // console.log(reviews.message);
      setReviews(reviews.message);
    };

    const addRestaurant = async () => {
       const res = await fetch(
         `${API_BASE}/restaurants`,{
         method : "POST",
         headers : {
           "Content-Type" : "application/json"
         },
         body : JSON.stringify({
           name : newRestaurantName,
           email : newRestaurantEmail,
           area : newRestaurantArea
         })
         });

       //  console.log(res);
       const data = await res.json();

        if (!res.ok){
      setError(data.message);   // in backend we set, res.json({message : data});
        }                     // so, we are doing data.message
                                  
    if(res.ok){
      setError(null); 
       // console.log(data.message._id);   //This will give the id of newly created restaurant
        const restaurantId = data.message._id;   //Storing the id of newly created restaurant

        setRestaurantCreated(true);
        setNewRestaurant(data.message);

      // Need to return here to prevent memory leak
       return history.push(`/restaurant/${restaurantId}`);  //passing that newly created restaurant id here
      // Once the restuarant is created succefully, it will take us to that specific restaurant page
     }
    }   //end of addRestaurant

  return (
   <div>   {/* Main div that incloses everything */}

      {loggedIn ?
      //True, If the user is logged in. Display all this informations
        <>
          <h1> Welcome {user.name} </h1>   {/* user is coming from the Context */}
            {/* {console.log(user)} */}

            {/* For displaying the users' orders from various restaurants */}
            <h1 className='orders-heading'>Your Past Orders</h1>
            <div className = 'restaurant-orders'>
                {orders.map(orderItem => (
                  <div className='orders' key = {orderItem._id}>
                    <h2>{orderItem.restaurant_id.name}</h2>
                    <div>
                      {orderItem.items.map(orderFoodsItems => (
                        <div key = {uuidv4()}>{orderFoodsItems} </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

          {/* For displaying the users' reviews from various restaurants */}
          <h1 className='reviews-heading'>You Reviews</h1>
          <div className='restaurant-reviews'>
            {reviews.map(reviewItem => (
              <div className = 'reviews' key = {reviewItem._id}>
                <h2 className='review-user'>{reviewItem.restaurant_id.name}</h2>
                <div className='review-content'>{reviewItem.content}</div>
                <div className ='review-rating' key = {reviewItem.rating[0]._id}>
                  <div className='food-rating'>Food : {reviewItem.rating[0].food}/10 </div>
                  <div className='service-rating'>Service : {reviewItem.rating[0].service}/10 </div>
                  <div className='environment-rating'>Environment : {reviewItem.rating[0].environment}/10 </div>
                  <div className='price-rating'>Price : {reviewItem.rating[0].price}/10 </div> 
                </div>
              </div>
            ))}
          </div>

          {/* For starting the business, we need to create the restaurant */}
          <h1> Do you want to start your own business? </h1>
          <h1> Start by creating your own restaurant </h1>
          <h2>Register a New Restaurant</h2>
          <div className = "create-restaurant-form">
              <label>Name of the Restaurant</label>
              <input 
                    type ="text" 
                    className = "add-todo-input" 
                    onChange = {e => setNewRestaurantName(e.target.value)}
                    value = {newRestaurantName}/>

              <label>Email</label>  
              <input 
                    type ="email" 
                    className = "add-todo-input" 
                    onChange = {e => setNewRestaurantEmail(e.target.value)}
                    value = {newRestaurantEmail}/>

              <label>Location</label>
              <input 
                    type ="text" 
                    className = "add-todo-input" 
                    onChange = {e => setNewRestaurantArea(e.target.value)}
                    value = {newRestaurantArea}/>

              <div className='create-restaurant-button' onClick = {addRestaurant} >Create Restaurant</div>
         </div>

          {/*End of the if logged in ternary operator*/}
        </>   

          :  // ternary operator

            //False, If the user is logged out. Display this message
            <h1> Please LogIn first to visit this page </h1>
          }

  </div>  //end of Main div that inclose everything
  );
}

export default UserProfile;
