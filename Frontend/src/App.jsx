import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopup from './components/loginPopup/LoginPopup'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myorders/MyOrders'
import './index.css'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {
      showLogin && <LoginPopup setShowLogin={setShowLogin} />
    }
    <div className='app'>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </div>
    <Footer />
    </>

  )
}

export default App
