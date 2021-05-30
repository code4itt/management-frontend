/*
import React from 'react'


const SetContext = setContext(async () => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    let user = localStorage.getItem('user');
    let token = user.accessToken;
    const { exp } = jwtDecode(token)
    // Refresh the token a minute early to avoid latency issues
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
      localStorage.clear();
    }
    return {
      // you can set your headers directly here based on the new token/old token
      headers: {
        
      }
    }
  })

export default SetContext;
*/