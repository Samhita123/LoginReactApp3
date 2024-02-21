import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function LandingPage() {
    return (
      <header style={ HeaderStyle }>
      <div className="buttons text-center"> 
        <Navbar />
        <h1>Login / Register Here</h1>
        <Link to="/login">
          <button>Log In</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      </header>
    )
  }
  
  const HeaderStyle = {
      width: "100%", 
      height: "100vh",
      //background: `url(${BackgroundImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
  }