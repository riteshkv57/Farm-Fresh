import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("Home")
    const navigate = useNavigate();

    const {getTotalCartAmount,token, setToken, user, logout} = useContext(StoreContext);
    // const { name } = user;
    const[username,setUsername]=useState(null);

    useEffect(()=>{
        const storedname=localStorage.getItem('username');
        if(storedname){
            setUsername(storedname)
        }
    },[]);
    
  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to={"/"} onClick={()=>setMenu("Home")} className={menu === "Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu"?"active":""}>Harvests</a>
            <a href='#feedback' onClick={()=>setMenu("feedback")} className={menu === "feedback"?"active":""}>Ratings</a>
            <a href='https://farm-fresh-adm.onrender.com' onClick={()=>setMenu("reservation")} className={menu === "reservation"?"active":""}>Admin</a>
            <a href='#footer' onClick={()=>setMenu("Contact-Us")} className={menu === "Contact-Us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img  src={assets.basket_icon} height={45} width={45} alt="" /></Link>
                <div className={getTotalCartAmount()=== 0 ?"":"dot"}></div>
            </div>
            {
                !token?<button onClick={()=>setShowLogin(true)}>sign in</button>
                :<div className='nav-profile'>
                    <img src={assets.profile_icon} alt="" height={40} width={40} />
                    <ul className='nav-profile-dropdown'>
                    <li><p>Hi. {username  || user?.name}</p></li>
                        <hr />
                        <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar
