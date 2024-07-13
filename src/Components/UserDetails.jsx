import React, { useEffect, useState } from 'react'
import defaultProfile from '../images/profile.png'
import { Link, useLocation, useParams } from 'react-router-dom';
import users from '../Data/user.json';
import ListAccordian from './subComponent/ListAccordian';
import Input from './subComponent/Input';
export default function UserDetails() {
  const location = useLocation();
  const [user, setUser] = useState();
  // const queryParams = new URLSearchParams(location.search);
  // const userId = queryParams.get('id');

  const {userId} = useParams();

  //Custom function to show all booking from the user details for List Accordian
  const ListAccordianDetail = ({ data }) => {

    const details = { 'User Name': data.name, 'Phone number': data.contact, 'Addhaar': data.aadhaar, 'Current Address': data.current_address, 'License': data.license };
    return <>
      <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

        <div className='flex flex-col gap-2'>

          {Object.entries(details).map(([key, value]) => (
            <div key={key} className='grid grid-cols-2'>
              <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>
              <div>{value}</div>
            </div>
          ))}
          <Link className='text-red-500 underline' to={`userDetails?id=${data.name}`} >View Details</Link>
        </div>
        {/* this need to be fixed */}
        <div className='flex justify-center'>
          {data.img && <img className=' aspect-video' src={data.img} alt="" />}
        </div>
      </div>
    </>
  }

  // this function will be replaced by api call
  useEffect(() => {
    setUser(users.find((user) => user.userId == userId));
    console.log(user);
  }, [])

  // 

  return (
    <div className='container m-auto pt-4 md:p-4 w-full min-h-full md:w-3/4 custom-Scroll'>

      <h1 className='heading  text-center  dark:text-white'>User Detail</h1>
      <div className="flex gap-4 mt-8 px-4 flex-col md:flex-row">
        <div className='md:w-1/3  flex  justify-center items-center '>
          <img className='object-center rounded-full w-[10rem] md:w-[15rem] border-2 shadow-md border-gray-400 dark:border-white aspect-square' src={user && user.profile ? user.profile : defaultProfile} />
         
        </div>
        <div className='md:w-2/3 flex flex-col gap-1'>
          {['name', 'email', 'contact', 'aadhaar', 'current_address', 'permanent_address', 'license'].map((e) => {
            return (
              <div className='grid grid-cols-2 py-2 border-b-2 dark:border-gray-600'>
                <div className=''>{e}</div>
                <div className='truncate'>{user?.[e]}</div>
              </div>
            )
          })}
          {/* document download button need to made */}
        </div>
      </div>
      {/* All the booking done by the user */}
      <div>
        {/* search to shortlist bikes from bike name, rc or owner name */}
        <div className='flex items-center gap-6 justify-end mt-12  '>

          <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4' placeholder='Bike name, RC number or Owner name' 
          />

        </div>
        {/* show all bikes */}
        <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
          <div className="w-full p-2  grid grid-cols-3 gap-4 text-sm md:text-base" >
            <div className="text-center  dark:bg-[#222222] p-1">User name</div>
            <div className="text-center  dark:bg-[#222222] p-1">Contact</div>
            <div className=" text-center  dark:bg-[#222222] p-1 ">Email</div>
          </div>
          <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
            {users?.map((user, id) => {
              return (
                <span key={id} className={id % 2 === 0 ? 'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                  <ListAccordian data={user} heading={[user.name, user.contact, user.email]} ListAccordianDetail={ListAccordianDetail} />

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
