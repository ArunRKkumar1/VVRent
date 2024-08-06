import React, { useEffect, useState } from 'react'
import defaultProfile from '../images/profile.png'
import { Link, useLocation, useParams } from 'react-router-dom';
import users from '../Data/user.json';
import ListAccordian from './subComponent/ListAccordian';
import Input from './subComponent/Input';
import { GET } from "../utils/apiCalls.js"
import moment from 'moment'
export default function UserDetails() {
  const location = useLocation();
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState([]);
  // const queryParams = new URLSearchParams(location.search);
  // const userId = queryParams.get('id');

  const { userId } = useParams();
  // User data formatting
  function formattingData() {
    return {
      "Name": user.name,
      "Email": user.email,
      "Contact": user.phone,
      "Aadhaar": user.aadhaar,
      "Current Address": user.currentAddress,
      "Parmanent Address": user.permanentAddress,
      "License": user.licenseNumber,
      "Verified ": user.verified ? "YES" : "NO"
    }
  }

  //Custom function to show all booking from the user details for List Accordian
  const ListAccordianDetail = ({ data }) => {
const endTime = moment(data.endTime,'Do MMMM YYYY h:mm:ss A');
const endRideTime =moment(data.endRideTime, 'Do MMMM YYYY h:mm:ss A');
    const totalDuratio = moment.duration(endRideTime.diff(moment(data.createdAt))).humanize();
  
    const details = { 'Booking Time': data.bookingTime , 'Grace Duration': data.duration+" "+data.durationType, 'Total Duration':totalDuratio, 'Booking End Time': data.endRideTime || "NULL", "Advance Amount":data.advanceAmount,
      "Advance Payment Mode":data.paymentMode,
      "Total Fair":data.totalFair || "NULL",
      "Status":data.status
    };
    return <>
      <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

        <div className='flex flex-col gap-2'>

          {Object.entries(details).map(([key, value]) => (
            <div key={key} className='grid grid-cols-2'>
              <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>
              <div>{value}</div>
            </div>
          ))}
          {/* <Link className='text-red-500 underline' to={`userDetails?id=${data.userId}`} >Bike Details</Link> */}
        </div>
        {/* this need to be fixed */}
        <div className='flex justify-center'>
          {data.img && <img className=' aspect-video' src={data.img} alt="" />}
        </div>
      </div>
    </>
  }

  //Fetching User Data
  async function fetchUserData() {
    GET(`/users/userDetails/${userId}`).then(e => {
      setUser(e.data);
    })
  }

  //Fetching All booking Done by user

  async function fetchBookingData() {
    GET(`/booking/userBookings/${userId}`).then(e => {
      setBookings(e.data);
    })
  }

// this function will be replaced by api call
useEffect(() => {
  fetchUserData();
  fetchBookingData();
}, [])

// 

return (
  <div className='container m-auto pt-4 md:p-4 w-full min-h-full md:w-3/4 custom-Scroll'>

    <h1 className='heading  text-center  dark:text-white'>User Detail</h1>
    <div className="flex gap-4 mt-8 px-4 flex-col md:flex-row">
      <div className='md:w-1/3  flex  justify-center items-center '>
        <img className='object-center rounded-full w-[10rem] md:w-[15rem] border-2 shadow-md border-gray-400 dark:border-white aspect-square' src={user && user.profile ? user.profile.url : defaultProfile} />

      </div>
      <div className='md:w-2/3 flex flex-col gap-1'>
        {user && Object.entries(formattingData()).map(([key, value], i) => {
          return (
            <div key={i} className='grid grid-cols-2 py-2 border-b-2 dark:border-gray-600'>
              <div className=''>{key}</div>
              <div className='truncate'>{value}</div>
            </div>
          )
        })}
        {/* document download button need to made */}
        <a className='text-blue-500 underline' href={user && user.aadhaarDoc.url} target='_blank'>Download Addhaar</a>
        <a className='mt-3 text-blue-500 underline' href={user && user.licenseDoc.url} target='_blank'>Download License</a>
      </div>
    </div>
    {/* All the booking done by the user */}
    <div>
      {/* search to shortlist bikes from bike name, rc or owner name */}
      <div className='text-center mt-12 '>
        <h1 className='text-3xl'>All Booking by user</h1>
      </div>
      <div className='flex items-center gap-6 justify-end  '>

        <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4' placeholder='Bike Name, RC'
        />

      </div>
      {/* show all bikes */}
      <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
        <div className="w-full p-2  grid grid-cols-3 gap-4 text-sm md:text-base" >
          <div className="text-center  dark:bg-[#222222] p-1">Booking Date</div>
          <div className="text-center  dark:bg-[#222222] p-1">Bike Name</div>
          <div className=" text-center  dark:bg-[#222222] p-1 ">Status</div>
        </div>
        <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
          {bookings?.map((books, id) => {
            return (
              <span key={id} className={id % 2 === 0 ? 'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                <ListAccordian data={books} heading={[ moment(books.bookingDate,"YYYY-MM-DD").format("Do MMMM YYYY"), books.bikeName,books.status]} ListAccordianDetail={ListAccordianDetail} />
{/* 2024-07-26 */}
              </span>
            )
          })}




        </ul>
      </div>
    </div>
    <div className='flex justify-center mt-4'>
      <button className='btn1 p-1 bg-slate-500 hover:bg-slate-800'>Edit Profile</button>

    </div>
  </div>
)
}

