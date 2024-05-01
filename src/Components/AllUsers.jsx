import Input from './subComponent/Input'
import React, { useEffect, useState } from 'react'
import allUser from '../Data/user.json'
import ListAccordian from './subComponent/ListAccordian'
import { Link } from 'react-router-dom';
export default function AllBikes() {
  //All data fetched from Server
  const [usersDatas,setUsersDatas] = useState([]);
  // Filter data from all usersDetails
  const [users,setUsers] = useState([]);
  const[searchInput,setSearchInput] = useState('');


  //Custom function to show all users details for List Accordian
  const ListAccordianDetail =({data})=>{
    
    const details ={'User Name':data.name ,'Phone number':data.contact,'Addhaar':data.aadhaar,'Current Address':data.current_address,'License':data.license};
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
  // function to filter data from all usersDetails
  const handleSearch = (data)=>{
    setSearchInput(data.target.value);
    const filterValue = data.target.value;
    const allUsers =  usersDatas.filter((user)=>{
      return  user.name.toLowerCase().includes(filterValue.toLowerCase()) || user.email.toLowerCase().includes(filterValue.toLowerCase()) || user.contact.startsWith(filterValue.toLowerCase())
    })
    console.log(allUsers);
     setUsers(allUsers);
  }

  // this function will be replaced when backend is developed and 
  // data will be fetched from backend
  useEffect(()=>{
    setUsersDatas(allUser);
    setUsers(allUser);
  },[])

  return (
    <div className='container mt-4 m-auto pt-4 w-full min-h-full md:w-3/4 '>
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
                <ListAccordian data={user}  heading={[user.name,user.contact,user.email]} ListAccordianDetail={ListAccordianDetail} />

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
