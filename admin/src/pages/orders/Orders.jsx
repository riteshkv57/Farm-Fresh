import React from 'react'
import "./Orders.css"
import { useState } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect } from 'react'
import {assets,url} from "../../assets/assets"

const Orders = () => {
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      
      // console.log("Full Response:", response);
  
      if (response.data && response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error ho gaya hai");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  }
  
  

  const statusHandler = async(event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.map((order,index)=>(
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" height={200} width={200} />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                      return item.name+"x"+item.quantity
                    }else{
                      return item.name+"x"+item.quantity+","
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                 <p> {order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>Rs. {order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Being Packed">Being Packed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Orders
