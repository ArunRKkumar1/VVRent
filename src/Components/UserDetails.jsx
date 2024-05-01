import React, { useEffect } from 'react'
import {  useLocation } from 'react-router-dom';
export default function BikeDetails() {
    const location = useLocation();
    const queryParams =new URLSearchParams(location.search);
    const bikeId = queryParams.get('id');

   
  return (
    <div className='container m-auto pt-4 w-full md:w-3/4 '>
      {bikeId}
    </div>
  )
}
