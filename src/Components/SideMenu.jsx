import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SideMenu() {


  const [sideMenuTranslate, setSideMenuTranslate] = useState(false)
  const toggleMenu = () => {
    if (sideMenuTranslate)
      setSideMenuTranslate(false)
    else
      setSideMenuTranslate(true)
  }
  return (
    <div className={`side-menu bg-[#394457] dark:bg-[#2b2b2b] w-full text-white z-10 top-[6vh] md:top-[10vh]   ${sideMenuTranslate ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500   md:w-2/5 xl:w-1/5`} >
      {<div className='menu-toggle w-max  relative left-full  md:block ' onClick={toggleMenu}>
        <img className='w-7 md:w-12' src="https://img.icons8.com/ios-filled/50/ffffff/menu--v6.png" alt="menu--v6" />
      </div>}

      <div className={`absolute w-full h-20 text-center top-0  text-3xl  pt-3 flex justify-between px-4 `} >Kalash Bharti
        {sideMenuTranslate && <div className='z-10 md:hidden' onClick={toggleMenu}>
          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/multiply.png" alt="multiply" />
        </div>}
      </div>
      <div className='mt-8 w-full h-full p-2'>
        <ul className='menu-list w-full flex flex-col  gap-2 list-none'>
         
          <li className='menu-list-item '>

            <div className='menu-heading  felx '>
              <h1>Manage User</h1>
              <img src="https://img.icons8.com/metro/26/ffffff/sort-down.png" alt="sort-down" />
            </div>
            <div className='menu-components  '>
              {/* Add Component List */}
              <ul className='list-none  flex flex-col items-center text-center py-1 gap-2' >
                
                  <Link className='px-3 w-full' to="/createUser ">Create User</Link>
                  <hr className="w-2/3 h-px   bg-gray-400 border-0"></hr>
                
              </ul>
            </div>

          </li>
          <li className='menu-list-item'>

            <div className='menu-heading  felx '>
              <h1>Manage Bikes</h1>
              <img src="https://img.icons8.com/metro/26/ffffff/sort-down.png" alt="sort-down" />
            </div>
            <div className='menu-components  '>
            <ul className='list-none  flex flex-col items-center text-center py-1 gap-2' >
                
                <Link className='px-3 w-full' to="/addBike ">Add bike</Link>
                <hr className="w-2/3 h-px   bg-gray-400 border-0"></hr>
                <Link className='px-3 w-full' to="/editBike ">Edit bike</Link>
                <hr className="w-2/3 h-px   bg-gray-400 border-0"></hr>
                <Link className='px-3 w-full' to="/allBikes ">All Bikes</Link>
                <hr className="w-2/3 h-px   bg-gray-400 border-0"></hr>
              
            </ul>
            </div>

          </li>
          <li className='menu-list-item'>

            <div className='menu-heading  felx '>
              <h1>Manage Bookings</h1>
              <img src="https://img.icons8.com/metro/26/ffffff/sort-down.png" alt="sort-down" />
            </div>
            <div className='menu-components  '>
              <ul className='list-none flex flex-col items-center py-1 gap-2' >
                <li className='px-3 w-4/5'>
                  <Link to="/booking ">Book rent</Link>
                  <hr className="w-full h-px  bg-gray-400 border-0"></hr>
                </li>

              </ul>
            </div>

          </li>
          <li className='menu-list-item'>

            <div className='menu-heading  felx '>
              <h1>Manage Admin</h1>
              <img src="https://img.icons8.com/metro/26/ffffff/sort-down.png" alt="sort-down" />
            </div>
            <div className='menu-components  '>
              <ul className='list-none flex flex-col items-center py-1 gap-2' >
                <li className='px-3 w-4/5'>
                  <a href="https://www.w3schools.com/css/css_dropdowns.asp">Add user</a>
                  <hr className="w-full h-px  bg-gray-400 border-0"></hr>
                </li>

              </ul>
            </div>

          </li>

        </ul>
      </div>

    </div>
  )
}
