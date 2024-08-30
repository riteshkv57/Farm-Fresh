import React from 'react'
import "./ExploreMenu.css"
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Discover Our Harvest</h1>
        {/* <p className='explore-menu-text'>Uncover a variety of fresh, flavorful options straight from the farm. Our mission is to nourish your body and delight your senses with every bite of our farm-to-table selections.</p> */}
        <h2>Handpicked <span>Farm Fresh</span> Goods</h2>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev === item.menu_name?"All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="menu image" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ExploreMenu
