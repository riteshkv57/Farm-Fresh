import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const { user, getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: user ? user._id : null,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        toast.success("Order placed successfully");
        navigate("/");
      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        userId: user ? user._id : null,
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 20,
      };

      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        toast.error("Error initiating payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount()]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs. {getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <div>
          </div>
          <button type='submit' className='btn'>Place your Order with COD</button>
          <button type='button' className='btn' onClick={handleOnlinePayment}>PAY ONLINE </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
