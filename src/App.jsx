import { useNavigate } from 'react-router-dom';

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
import { useEffect, useState } from 'react';
import AllBikes from './Components/AllBikes';
import SideBar from './Components/Sidebar';
import BikeDetails from './Components/BikeDetails';
import EditBikeModal from './Components/EditBikeModal';
import Login from './Components/Login';
import DashBoard from './Components/DashBoard';
import PrivateRoute from './Components/PrivateRoute';
import AllBooking from './Components/AllBooking';
import ExtendBooking from './Components/ExtendBooking';
import EndBooking from './Components/EndBooking';
import AllRefund from './Components/AllRefund';
import AllBorrow from './Components/AllBorrow';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  //disable scroll input change to all the input with type number
  useEffect(() => {
    const handleWheel = (event) => {
        if (event.target.type === 'number') {
            event.preventDefault();
        }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
        document.removeEventListener('wheel', handleWheel);
    };
}, []);
  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-[100vh]  bg-white text-black transition-colors duration-700 dark:bg-black dark:text-white`}>

      <Router>
        <nav className='fixed top-0 w-full  z-20'>

          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          {/* <SideMenu /> */}
          <SideBar />
        </nav>

        <div className='mt-10'>
        <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<DashBoard />} />
              {/* <Route exact path="/manage/bike/edit-bike/:id" element={<EditBike />} /> */}
              <Route exact path="/manage/bike/add-bike" element={<AddBike />} />
              <Route exact path="/manage/bike/all-bikes" element={<AllBikes />} />
              {/* <Route exact path="/manage/bike/edit-bike/" element={<EditBikeModal />} /> */}
              <Route exact path="/manage/bike/allBikes/bike-details/:id" element={<BikeDetails />} />
              <Route exact path="/manage/user/create-user" element={<CreateUser />} />
              <Route exact path="/manage/booking/add-booking" element={<Booking />} />
              <Route exact path="/manage/booking/all-booking" element={<AllBooking />} />
              <Route exact path="/manage/booking/extend" element={<ExtendBooking />} />
              <Route exact path="/manage/booking/end-ride/:id" element={<EndBooking />} />
              <Route exact path="/manage/user/all-user" element={<AllUsers />} />
              <Route exact path="/manage/user/all-user/user-details/:id" element={<UserDetails />} />
              <Route exact path="/manage/refund/all-refund" element={<AllRefund />} />
              <Route exact path="/manage/borrowers/all" element={<AllBorrow />} />
            </Route>
            <Route exact path="/login" element={<Login />} />

          </Routes>
        </div>
      </Router>

    </div>
  )
}

export default App
