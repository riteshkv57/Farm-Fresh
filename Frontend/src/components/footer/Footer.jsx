import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="Company Logo" />
            <p>Discover the best flavors from around the world right in your neighborhood. We offer a curated selection of dishes designed to satisfy every palate. Join us in celebrating great taste and exceptional quality every day.</p>

            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="Facebook icon" />
                <img src={assets.twitter_icon} alt="Twitter icon" />
                <img src={assets.linkedin_icon} alt="LinkedIn icon" />
            </div>
        </div>
        <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact Us</h2>
            <ul>
                <li>+91-9798159605</li>
                <li>ritesh0057@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        &copy; 2024 FARM FRESH. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer;
