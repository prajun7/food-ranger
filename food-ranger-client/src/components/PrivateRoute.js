/*
I am not using private routes in this project.
User can visit their profile page only if they are logged in.
The link to the user's profile page only shows up, once they are logged in.
So, those users who are not logged in cannot press on the user's profile 
since it is not visible to users who are not logged in
*/

import React from 'react';

// This will be the wrapper to warp the current route
// We will create a private route
// It is higher order component

function PrivateRoute({component : Component, ...rest}) {
  return (
  <div>
      <h1>Forgot Password page</h1>
  </div>
  );
}

export default PrivateRoute;
