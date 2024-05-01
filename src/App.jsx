
import './CSS/main.css'
import AddBike from './Components/AddBike'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditBike from './Components/EditBike'
import Navbar from './Components/Navbar'
import SideMenu from './Components/SideMenu'
import Booking from './Components/Booking'
import UserDetails from './Components/UserDetails'
import AllUsers from './Components/AllUsers'
import CreateUser from './Components/CreateUser';
import { useState } from 'react';
import AllBikes from './Components/AllBikes';
import SideBar from './Components/Sidebar';
import BikeDetails from './Components/BikeDetails';

function App() {
  const[darkMode, setDarkMode]= useState(localStorage.getItem('darkMode')==='true');
  return (
    <div className={`${darkMode?'dark':''} min-h-[100vh]  bg-white text-black transition-colors duration-700 dark:bg-black dark:text-white`}>
      <Router>
        <nav className='fixed top-0 w-full '>

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* <SideMenu /> */}
        <SideBar/>
        </nav>

        <div className='mt-10'>
          <Routes>

          <Route exact path="" element={
            <AddBike />
          } />
          <Route exact path="/manage/bike/editBike/:id" element={
            <EditBike />
          } />
          <Route exact path="/manage/bike/addBike" element={
            <AddBike />
          } />
            <Route exact path="/manage/bike/allBikes" element={
              <AllBikes/>
            } />
            <Route exact path="/manage/bike/allBikes/bikeDetails" element={
              <BikeDetails/>
            } />
          <Route exact path="/manage/user/createUser" element={
            <CreateUser />
          } />
          <Route exact path="/manage/booking/addBooking" element={
            <Booking/>
          } />
          <Route exact path="/manage/user/allUser" element={
            <AllUsers/>
          } />
          <Route exact path="/manage/user/allUser/userDetails" element={
            <UserDetails/>
          } />


          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
