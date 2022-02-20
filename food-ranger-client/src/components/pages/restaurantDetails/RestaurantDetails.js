/*
From the home component or page, when we press in any specific restaurant
we will be redirected to this page
This page displays the information of each restaurants, that we click in home page
Here, we are using { match }, which contains restaurants information that we are getting from
home page or component
*/


import React, { useState, useEffect, useContext } from 'react';
import './RestaurantDetails.css';

// This will generate unique id each time
// To use, just call uuidv4()
// Using in review as a unique Key, see below
import { v4 as uuidv4 } from 'uuid';  

// Using context to get information of the loggedin Users
import { UserContext } from '../../../contexts/UserContext';

// Using moment to format the date that we are getting from the database
import Moment from 'react-moment';

// This will be the RestaurantDetails Page,
// User will be able to see Restaurant Details from this page

const API_BASE = "http://localhost:9000";

// Match comes from the "link to", from the previous page, that is home.js
// Whenever we use "link to", it also gives us the properties
function RestaurantDetails({ match }){

  const { loggedIn, restaurantCreated, user } = useContext(UserContext);

  useEffect (() => {
    // console.log(match.params.name);  Gives the id of the restaurant
    fetchRestaurantDetails();
    fetchRestaurantReviews();
    fetchRestaurantsOrders();

  }, []);

 // For getting restaurants, menus, reviews and orders from the database
  const [restaurant, setRestaurant] = useState([]);
  const [menu, setMenu] = useState([]);
  const [review, setReview] = useState([]);
  const [order, setOrder] = useState([]);

  // For popup menus to add menu, to add review and to add order
  const [popupActiveMenu, setPopupActiveMenu] = useState(false);
  const [popupActiveReview,setPopupActiveReview] = useState(false);
  const [popupActiveOrder, setPopupActiveOrder] = useState(false);

  // For creating menu and adding item and price from the user inputs
  const [newMenuItemName, setNewMenuItemName] = useState("");
  const [newMenuItemPrice, setNewMenuItemPrice] = useState("");

  // For creating new review from the user inputs
  const[reviewContent ,setReviewContent] = useState("");
  const[reviewFood ,setReviewFood] = useState("");
  const[reviewService ,setReviewService] = useState("");
  const[reviewEnvironment ,setReviewEnvironment] = useState("");
  const[reviewPrice ,setReviewPrice] = useState("");

  //For creating new order from the user inputs
  const[order1, setOrder1] = useState("");
  const[order2, setOrder2] = useState("");
  const[order3, setOrder3] = useState("");
  let randomSubTotal = Math.round(115 + Math.random() * 500);  //generate random number between 115 to 500 for subtotal
  //generating random subtotal for now, will implement total sum later

  // Fetches the restaurant's details like name, location and menu from the backend
  const fetchRestaurantDetails = async () => {
    // console.log(match.params.name);  Gives the id of the restaurant
    const data = await fetch(
      `${API_BASE}/restaurants/${match.params.name}`
    );
    
    const restaurant = await data.json();
    // console.log(restaurant.message);
    setRestaurant(restaurant.message);   // To set the restaurant information
    setMenu(restaurant.message.menu);
  };

  // Fetches the restaurant's reviews from the backend
  const fetchRestaurantReviews = async () => {
    const data = await fetch(
      `${API_BASE}/restaurants/${match.params.name}/reviews`
    );

    const reviews = await data.json();
    // console.log(reviews.message);
    setReview(reviews.message);   // To set the review
  }

  //fetches the restaurants's orders
  const fetchRestaurantsOrders = async() => {
    const data = await fetch(
      `${API_BASE}/restaurants/${match.params.name}/orders`
    );

    const orders = await data.json();
    // console.log(orders.message);
    setOrder(orders.message);    // To set the order
  }

  /*
  Function to add the menu from the user's input
  Need to call post method from the backend
  */
  const addMenu = async () => {
    await fetch(
      `${API_BASE}/restaurants/addmenu/${match.params.name}`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "name" : newMenuItemName ,
          "unit_price" : parseInt(newMenuItemPrice)
        })
      }
    );
    setPopupActiveMenu(false);
    fetchRestaurantDetails();   //Refresh the page to see the added menu
  }

  /*
  Function to add the reviews from the user's input
  Need to call post method from the backend
  */
  const addReview = async () => {
     await fetch(
       `${API_BASE}/restaurants/${match.params.name}/reviews`,{
         method : "POST",
         headers : {
           "Content-Type" : "application/json"
         },
         body : JSON.stringify({
         "user_id" : `${user._id}`,
           "content" : reviewContent ,
           "rating" : [{
             "food" : parseInt(reviewFood),
             "service" : parseInt(reviewService),
		         "environment" : parseInt(reviewEnvironment),
	          "price" : parseInt(reviewPrice)
           }]
         })
       }
     );
     setPopupActiveReview(false);
     fetchRestaurantReviews();   //Again refresh the page to see the added review
   }

  /*
  Function to add the orders from the user's input
  Need to call post method from the backend
  */
   const addOrder = async () => {
     await fetch(
       `${API_BASE}/restaurants/${match.params.name}/orders`,{
         method : "POST",
         headers : {
           "Content-Type" : "application/json"
         },
         body : JSON.stringify({
         "user_id" : `${user._id}`,
          "items" : [order1,order2,order3],   //arrays of string
          "subtotal" : randomSubTotal
         })
       }
     );
     setPopupActiveOrder(false);
     fetchRestaurantsOrders();   //Again refresh the page to see the added review
   }

  // Opens the addMenu's window and closes the other windows
  function createNewMenuButton(){
    setPopupActiveMenu(true);
    setPopupActiveReview(false);
    setPopupActiveOrder(false);
  }

    // Opens the addReview's window and closes the other windows
    function createNewReviewButton(){
      setPopupActiveReview(true);
      setPopupActiveOrder(false);
      setPopupActiveMenu(false);
    }

    // Opens the addOrder's window and closes the other windows
    function createNewOrderButton(){
      setPopupActiveOrder(true);
      setPopupActiveReview(false);
      setPopupActiveMenu(false);
    }

  return (

  <div>  {/* Main div that incloses everything */}

    <h1 className='restautant-heading'>{restaurant.name}</h1>


    {/* ********************** For adding Additional Menu items in the restaurant **************** */}
    {loggedIn && restaurantCreated ? (
    <> 
      <button className = "menu-restaurant-button" onClick = {() => createNewMenuButton()}>Add Menus</button>

      {/* If popupActiveMenu is true, then only the form to create the restaurant will pop up */}
      {popupActiveMenu ? (
        <div className = "popup">
          <div className='close-popup' onClick = {() => setPopupActiveMenu(false)}> X </div>
          <div className = 'content'>
            <h3>Add Menus</h3>
    
              <label>New Dish Name</label>
              <input 
                    type ="text" 
                    className = "add-menu-text" 
                    onChange = {e => setNewMenuItemName(e.target.value)}
                    value = {newMenuItemName}/>

              <label>Unit Price</label>  
              <input 
                    type ="text" 
                    className = "add-price-text" 
                    onChange = {e => setNewMenuItemPrice(e.target.value)}
                    value = {newMenuItemPrice}/>

              <div className='add-menu-button' onClick = {addMenu}> Add Menu </div>
           </div>
         </div>

      ) : ''}   {/* end of popupActiveMenu */}
      
    </>
  ) : '' }    {/* end of loggedIn && restaurantCreated Close */}
    
    
      {/* ********************* For displaying Restaurants' Details *************************** */}
      <div className = 'wrap' key = {restaurant._id}>
          <div className = 'restautant-address'>Address </div>
          <div className = 'restautant-address-value'>{restaurant.area}</div>
      </div>

      {/* ******** Displaying menu*************** */}
      <div className = 'restaurant-details'>
        <div className = 'restaurant-menu'>Menu  </div>
          {menu.map(menuItem => (
            <div key = {menuItem._id} className = "menu">
              <div className = "menu-name">
                {menuItem.name}
              </div>
              <div className = "menu-price">
                ${menuItem.unit_price} 
              </div>
            </div>
          ))}
      </div>

      
      {/* #################  Restaurant's Reviews  ################### */}
      <h1 className='reviews-heading'>Reviews</h1>

      {/* **************** For adding Additional Reviews for the restaurant from user *************** */}
      {/* only a logged in user can add reviews */}

      {loggedIn ? (
        <> 
          <button className = "menu-restaurant-button" onClick = {() => createNewReviewButton()}>Add Review</button>
          {popupActiveReview ? (
            <div className = "popup">
              <div className='close-popup' onClick = {() => setPopupActiveReview(false)}> X </div>
                <div className = 'content'>
                  <h3>Add Review</h3>
    
                  <label>Content</label>
                  <input 
                        type ="text" 
                        className = "add-menu-text" 
                        onChange = {e => setReviewContent(e.target.value)}
                        value = {reviewContent}/>

                  <label>Food Out of 10</label>  
                  <input 
                        type ="number" 
                        className = "add-price-text" 
                        onChange = {e => setReviewFood(e.target.value)}
                        value = {reviewFood}/>

                  <label>Service Out of 10</label>  
                      <input 
                      type ="number" 
                      className = "add-price-text" 
                      onChange = {e => setReviewService(e.target.value)}
                      value = {reviewService}/>

                  <label>Environment Out of 10</label>  
                      <input 
                      type ="number" 
                      className = "add-price-text" 
                      onChange = {e => setReviewEnvironment(e.target.value)}
                      value = {reviewEnvironment}/>

                  <label>Price Out of 10</label>  
                      <input 
                      type ="number" 
                      className = "add-price-text" 
                      onChange = {e => setReviewPrice(e.target.value)}
                      value = {reviewPrice}/>

                <div className='add-menu-button' onClick = {addReview} >Add Review</div>
              </div>
            </div>

          ) : ''}     {/* end of popupActiveReview */}
            </>
      ) : '' }  {/* end of loggedIn */}

    {/* ****************** For displaying Restaurants' reviews from Databse ********************** */}
            <div className='restaurant-reviews'>
        {review.map(reviewItem => (
          <div className = 'reviews' key = {reviewItem._id}>
            <h2 className='review-user'>{reviewItem.user_id.name}</h2>
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


    {/* #################  Restaurant's orders  ################### */}
     <h1 className='orders-heading'> Orders</h1>

    {/* ##################################  For adding new Orders ################################## */}
      {loggedIn ? (
        <> 
          <button className = "menu-restaurant-button" onClick = {() => createNewOrderButton()}>Place an Order</button>
          {/* If popupActiveMenu is true, then only the form to create the restaurant will pop up */}
          {popupActiveOrder ? (
            <div className = "popup">
              <div className='close-popup' onClick = {() => setPopupActiveOrder(false)}> X </div>
                <div className = 'content'>
                  <h3>Place an Order</h3>

                  <label>Order 1</label>  
                  <input 
                        type ="text" 
                        className = "add-price-text" 
                        onChange = {e => setOrder1(e.target.value)}
                        value = {order1}/>

                  <label>Order 2</label>  
                  <input 
                        type ="text" 
                        className = "add-price-text" 
                        onChange = {e => setOrder2(e.target.value)}
                        value = {order2}/>

                  <label>Order 3</label>  
                  <input 
                        type ="text" 
                        className = "add-price-text" 
                        onChange = {e => setOrder3(e.target.value)}
                        value = {order3}/>


                <div className='add-menu-button' onClick = {addOrder} >Place Order</div>
              </div>
            </div>

          ) : ''}   {/* end of popupActiveOrder */}
            
            </>
        ) : '' }   {/* end of loggedIn */}


    {/* ################# For displaying Restaurants' orders from database ################### */}
        <div className = 'restaurant-orders'>
          {order.map(orderItem => (
            <div className='orders' key = {orderItem._id}>
              <h2>{orderItem.user_id.name}</h2>
              {/* Using Moment to format the dates which we are getting from the database */}
              <Moment fromNow><p>{orderItem.date}</p></Moment>
              <div>
                {orderItem.items.map(orderFoodsItems => (
                  <div key = {uuidv4()}>{orderFoodsItems} </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      {/* end of main div */}
  </div>    
  );
}

export default RestaurantDetails;
