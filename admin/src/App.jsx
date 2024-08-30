import React,{useState} from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from "./pages/add/Add"
import List from "./pages/list/List"
import Orders from "./pages/orders/Orders"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login/Login';



const App = () => {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const url = "http://localhost:5000";

  const handleLogin = (status) =>{
    setIsAuthenticated(status);
  };

  return (
    <div>
      <ToastContainer />
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar />
        <hr />
        <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Add url={url} />} />
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
        </div>
        </>
      )} 
    </div>
  )
}

export default App
