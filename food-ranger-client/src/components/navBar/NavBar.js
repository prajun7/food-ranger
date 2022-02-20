import React, { useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { UserContext } from '../../contexts/UserContext';

// Using context to display UserProfile page only when the user is logged in


function NavBar() {

  // Getting user info from the context
  const {loggedIn, setLoggedIn, setUser, setRestaurantCreated} = useContext(UserContext);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // Calling this function, to logout the user
  // To logout the user we are setting LoggedIn to false and clearing the User data to null
  function LoggOutButton(){
    closeMobileMenu();
    setLoggedIn(false);
    setRestaurantCreated(false);   //Need to set this to false as well, to close the ADD Menu Button
    setUser(null);
}

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            FOOD RANGER
            <i className='fab fa-typo3' />
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            {loggedIn ?
                //True, When user is logged in, show logOut button
                <li className='nav-item'>
                  <Link
                    to='/'
                    className='nav-links'
                    onClick={LoggOutButton}
                  >
                    LogOut
                  </Link>
                </li>
            : 
                //False, When use id logged Out, show logIn button
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    LogIn
                  </Link>
                </li>
            
            }

                <li className='nav-item'>
                  <Link
                    to='/aboutus'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    AboutUs
                  </Link>
                </li>
           
            {/* This is for the mobile view. For showing SignUp button */}
            {loggedIn ?
                //True, When user is logged in, show User page button instead of signUp button
                <li className='nav-item'>
                  <Link
                    to='/user'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                </li>
            : 
                //False, When user is logged Out, show signUp button instead of User page button
                 <li>
                    <Link
                      to='/signup'
                      className='nav-links-mobile'
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                </li>
            }
          </ul>

          {/* This link is for desktop view, we are using the button component to create this link */}
          {loggedIn ? 
            //True, When user is logged in, show User page button instead of signUp button
            button && <Button linkTo = '/user' buttonOnClick = {closeMobileMenu} buttonStyle='btn--outline'>Profile</Button>

          :
             //False, When user is loggeOut, show SignUp button
          button && <Button linkTo = '/signup' buttonOnClick = {closeMobileMenu} buttonStyle='btn--outline'>SIGN UP</Button>
        
        }
          


        </div>
      </nav>
    </>
  );
}

export default NavBar;