import Input from './subComponent/Input'
import React, { useEffect, useState } from 'react'

import ListAccordian from './subComponent/ListAccordian'
import { Link } from 'react-router-dom';
import { GET } from '../utils/apiCalls';
import Toast from './subComponent/Toast';
export default function AllBikes() {
  //All data fetched from Server
  const [usersDatas,setUsersDatas] = useState([]);
  // Filter data from all usersDetails
  const [users,setUsers] = useState([]);
  const[searchInput,setSearchInput] = useState('');
  const [showToast,setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  //Custom function to show all users details for List Accordian
  const ListAccordianDetail =({data})=>{
    
    const details ={'User Name':data.name ,'Phone number':data.phone,'Addhaar':data.aadhaar,'Current Address':data.currentAddress,'License':data.licenseNumber, 'Verified':data.verified?"Verified":"Not Verified",};
    return <>
     <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

       <div className='flex flex-col gap-2'>

    {Object.entries(details).map(([key, value]) => (
      <div key={key} className='grid grid-cols-2'>
        <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>       
        <div>{value}</div>
    </div>
    ))}
     <Link className='text-red-500 underline' to={`user-details/${data._id}`} >View Details</Link>
    </div>
    {/* this need to be fixed */}
    <div className='flex justify-center'>
              {data.profile && <img className='max-h-60' src={data.profile.url} alt="" />}
          </div>
    </div>
  </>
  }


  // function to filter data from all usersDetails
  const handleSearch = (data)=>{
    setSearchInput(data.target.value);
    const filterValue = data.target.value;
    const allUsers =  usersDatas.filter((user)=>{
      return  user.name.toLowerCase().includes(filterValue.toLowerCase()) || user.email.toLowerCase().includes(filterValue.toLowerCase()) || user.contact.startsWith(filterValue.toLowerCase())
    })
     setUsers(allUsers);
  }


  // Fetching all the user 
  async function fetchAllUsers(){
    await GET("/users/all-user").then(response=>{
      console.log(response.data);
      setUsersDatas(response.data)
      setUsers(response.data)
    }).catch(e=>{
      setShowToast(true);
      setToastMessage(e.message);
    })
  }
  // data will be fetched from backend
  useEffect(()=>{
    fetchAllUsers();
  },[])

  return (
    <>
      {showToast && <Toast message={toastMessage} setShow={setShowToast} />}
    <div className='container mt-4 m-auto pt-4 w-full min-h-full md:w-3/4 custom-Scroll'>
      <h1 className='heading  text-center  dark:text-white'>All Registered User</h1>
      {/* search to shortlist bikes from bike name, rc or owner name */}
      <div className='flex items-center gap-6 justify-end mt-12  '>
  
        <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4'  placeholder='Bike name, RC number or Owner name'  onChange={handleSearch}
/>
        {/* <button className='btn1 ' onClick={handleSearch} >Search</button> */}

      </div>
      {/* show all bikes */}
      <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
        <div className="w-full p-2  grid grid-cols-3 gap-4 text-sm md:text-base" >
          <div className="text-center  dark:bg-[#222222] p-1">User name</div>
          <div className="text-center  dark:bg-[#222222] p-1">Contact</div>
          <div className=" text-center  dark:bg-[#222222] p-1 ">Email</div>
        </div>
        <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
          {users?.map((user, id)=>{
            return(
              <span key={id} className={id%2===0?'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                <ListAccordian data={user}  heading={[user.name,user.phone,user.email]} ListAccordianDetail={ListAccordianDetail} />

              </span>
            )
          })}
     
         {/* {bikes?.map((bike,id)=>{

         })} */}
         


        </ul>
      </div>
    </div>
    </>
  )
}
