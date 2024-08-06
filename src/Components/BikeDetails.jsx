import React, { useEffect } from 'react'
import {  useLocation, useParams } from 'react-router-dom';
export default function BikeDetails() {
    // const location = useLocation();
    // const queryParams =new URLSearchParams(location.search);
    // const bikeId = queryParams.get('id');
    const {id} = useParams();
   
  return (
    <div className='container m-auto pt-4 w-full md:w-3/4 '>
       <h1 className='heading  text-center  dark:text-white'>Bike Detail</h1>
    </div>
  )
}
