import Input from './subComponent/Input'
import React, { useEffect, useState } from 'react'
import ListAccordian from './subComponent/ListAccordian'
import { Link } from 'react-router-dom';
import { GET } from '../utils/apiCalls.js';
export default function AllBooking() {
  //All data fetched from Server
  const [bookingDatas,setbookingDatas] = useState([]);
  // Filter data from all bookingDetails
  const [booking,setbooking] = useState([]);
  const[searchInput,setSearchInput] = useState('');


  //Custom function to show all booking details for List Accordian
  const ListAccordianDetail =({data})=>{
    
    const details ={'User Name':data.userName ,'Phone number':data.userContact, 'booking date': data.bookingDate, 'bookingTime':data.bookingTime};
    return <>
     <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

       <div className='flex flex-col gap-2'>

    {Object.entries(details).map(([key, value]) => (
      <div key={key} className='grid grid-cols-2'>
        <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>       
        <div>{value}</div>
    </div>
    ))}
     <Link className='text-red-500 underline' to={`/manage/user/allUser/userDetails/${data.userId}`} >About User</Link>
     <Link className='text-red-500 underline' to={`/manage/bike/allBikes/bikeDetails/${data.userId}`} >About Bike</Link>

    </div>
    </div>
  </>
  }
  // function to filter data from all bookingDetails
  const handleSearch = (data)=>{
    setSearchInput(data.target.value);
    const filterValue = data.target.value;
    const allbooking =  bookingDatas.filter((user)=>{
      return  user.name.toLowerCase().includes(filterValue.toLowerCase()) || user.email.toLowerCase().includes(filterValue.toLowerCase()) || user.contact.startsWith(filterValue.toLowerCase())
    })
     setbooking(allbooking);
  }

  // this function will be replaced when backend is developed and 
  // data will be fetched from backend
  useEffect(()=>{
    getBookings();
  },[])

  const getBookings = async()=>{
    await GET('/booking/bookings').then(res=>{
      setbookingDatas(res.data)
      setbooking(res.data)
    })
  
  }

  return (
    <div className='container mt-4 m-auto pt-4 w-full min-h-full md:w-3/4 custom-Scroll'>
      <h1 className='heading  text-center  dark:text-white'>All Booking</h1>
      {/* search to shortlist bikes from bike name, rc or owner name */}
      <div className='flex items-center gap-6 justify-end mt-12  '>
  
        <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4'  placeholder='Bike name, RC number or Owner name'  onChange={handleSearch}
/>
        {/* <button className='btn1 ' onClick={handleSearch} >Search</button> */}

      </div>
      {/* show all bikes */}
      <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
        <div className="w-full p-2  grid grid-cols-4 gap-4 text-sm md:text-base" >
          <div className="text-center  dark:bg-[#222222] p-1">User name</div>
          <div className="text-center  dark:bg-[#222222] p-1">Bike name</div>
          <div className=" text-center  dark:bg-[#222222] p-1 ">Duration </div>
          <div className=" text-center  dark:bg-[#222222] p-1 ">Status</div>
        </div>
        <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
          {booking?.map((book, id)=>{
            return(
              <span key={id} className={id%2===0?'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                <ListAccordian data={book}  heading={[book.userName,book.bikeName,book.duration+" "+ book.durationType, book.status]} ListAccordianDetail={ListAccordianDetail} />

              </span>
            )
          })}
     
         {/* {bikes?.map((bike,id)=>{

         })} */}
         


        </ul>
      </div>
    </div>
  )
}
