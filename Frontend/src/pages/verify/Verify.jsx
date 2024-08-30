import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setsearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async() => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            console.log("payment done")
            navigate("/myorders")
        }else{
            navigate("/")
            console.log("error in the payment")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])


  return (
    <div className='verify'>
        <div className="spinner">
        </div>
    </div>
  )
}

export default Verify
