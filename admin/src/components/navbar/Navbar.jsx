import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"

const Navbar = () => {
  return (
    <div className='navbar'>
            <img src={assets.logo} alt="" className='logo' />
            <p>Admin-Panel</p>
            <img src={assets.profile_image} alt="" className='profile' />
    </div>
  )
}

export default Navbar
