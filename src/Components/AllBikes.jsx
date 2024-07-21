import Input from './subComponent/Input'
import React, { useEffect, useState } from 'react'
import ListAccordian from './subComponent/ListAccordian'
import { Link, useNavigate } from 'react-router-dom';
import { GET } from '../utils/apiCalls';
export default function AllBikes() {
  //all bikes came from backend
  const [allBikes,setallBikes] = useState([]);
  //filetered bike
  const [bikes,setBikes] = useState([]);
  const[searchInput,setSearchInput] = useState('');

  //list element
  const ListAccordianDetail =({data})=>{
   // This object will contain a comprehensive list of all the data that needs to be showcased
    const details ={'Owner Name':data.ownerName ,'Owner Phone number':data.ownerPhone,'RC Number':data.rcNumber,'Starting charge (3 Hours)':data.startPrice, "Per Hour" :data.perHour, "Per hour Extra":data.perHourExtra,"Per Day":data.perDay}
    return <>
     <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

       <div className='flex flex-col gap-2'>

    {Object.entries(details).map(([key, value]) => (
      <div key={key} className='grid grid-cols-2'>
        <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>       
        <div>{value}</div>
    </div>
    ))}
    {/* data.RC will be replaced with Data.id
     bikeDetails?id=$value will redirect to bikedetail component with the bike id which will further use to fetch all the details of the bike */}
    <Link className='text-red-500 underline' to={`bikeDetails/${data._id}`} >View Details</Link>
    
    </div>
    <div className='flex justify-center'>
              {data.img && <img className=' aspect-video' src={data.img} alt="" />}
          </div>
    </div>
  </>
  }

  //on search
  const handleSearch = (data)=>{
    setSearchInput(data.target.value);
    const filterValue = data.target.value;
    const allBike = allBikes.filter((bike)=>{
      return bike.name.toLowerCase().includes(filterValue.toLowerCase()) || bike.RC.toLowerCase().includes(filterValue.toLowerCase()) || bike.owner.toLowerCase().includes(filterValue.toLowerCase())
    })

    setBikes(allBike);
  }

  async function fetchBikes(){
     await GET("/bikes/getAllBikes").then(e=>{
      setallBikes(e.data)
      console.log(e.data);
      setBikes(e.data)
    }).catch(e=>{
      console.log(e);
    })

  }

  useEffect(()=>{
    fetchBikes()
  },[])

  return (
    <div className='container m-auto pt-4 w-full min-h-full md:w-3/4 custom-Scroll'>
      <h1 className='heading  text-center  dark:text-white'>All Bikes</h1>
      {/* search to shortlist bikes from bike name, rc or owner name */}
      <div className='flex items-center gap-6 justify-end mt-12  '>
  
        <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4'  placeholder='Bike name, RC number or Owner name'  onChange={handleSearch}
/>
        {/* <button className='btn1 ' onClick={handleSearch} >Search</button> */}

      </div>
      {/* show all bikes */}
      <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
        <div className="w-full p-2  grid grid-cols-4 gap-4 text-sm md:text-base" >
          <div className="text-center  dark:bg-[#222222] p-1">Bike name</div>
          <div className="text-center  dark:bg-[#222222] p-1">RC Number</div>
          <div className=" text-center  dark:bg-[#222222] p-1">Recent Maintanance</div>
          <div className=" text-center  dark:bg-[#222222] text-green-500 p-1">Status</div>

        </div>
        <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
          {bikes?.map((bike, id)=>{
            return(
              <span key={id} className={id%2===0?'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                <ListAccordian  data={bike}  heading={[bike.bikeName,bike.rcNumber,bike.recentMaintanace,bike.status]} ListAccordianDetail={ListAccordianDetail} />

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
