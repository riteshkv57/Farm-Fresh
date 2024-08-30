import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className="plate">
                <img src="https://png.pngtree.com/png-clipart/20230310/original/pngtree-cartoon-characters-of-indian-farmers-png-image_6839628.png" alt="" />
        </div>
        <div className="header-contents">
            <h2>Harvested <span>Fresh</span>, Delivered with <span>Care</span></h2>
            <p>Explore a wide range of farm-fresh products, straight from the fields to your kitchen. Taste the difference in every bite, with produce that’s grown sustainably and delivered at the peak of freshness.

</p>
            <a href="#explore-menu"><button className='view-more'>Browse Harvest</button></a>
        </div>      
     </div>
  )
}

export default Header
