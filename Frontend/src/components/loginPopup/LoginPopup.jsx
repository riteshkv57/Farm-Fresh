import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign up");

    const [data,setData] = useState({
        name:"",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = 'https://farm-fresh-backend.onrender.com'
        if(currState === "login"){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }
        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("username",response.data.username)
            setShowLogin(false);
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message);
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'login' ? <>
                    </> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
                </div>
                <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
                {currState==="login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>:<p>Already have an account?  <span onClick={()=>setCurrState("login")}>Login here</span></p>}
                
                
            </form>
        </div>
    )
}

export default LoginPopup
