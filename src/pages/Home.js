import React from "react"
import { NavLink } from "react-router-dom"

const Home = (current_user) => {
  return (
    <>
      <div  className="home-background">
        <div className="welcome-box">
          <h1>Welcome!</h1>
          <p>We are excited to help you on your search for your next home. You can view all recent listings and contact the apartment manager.  If you are an apartment manager and wish to list your apartment, please log in to create a new listing or modify a previous listing.  Home is where the heart is, and our heart is to find you a new home.</p>
        </div>
      </div>
    </>
  )
}

export default Home