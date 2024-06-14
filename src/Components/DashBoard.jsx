import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { POST } from '../utils/apiCalls.js';

export default function DashBoard() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [file,setFile] = useState(null);

  const handleUpload = async(data)=>{
    console.log(data)
    const formData = new FormData();
    for (const key in data) {
      if (key === 'file') {
        // Access the first file directly
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const response = await POST(`/temp/share`, formData);
      return response.data;
  } catch (error) {
      console.error('Error while calling the api', error.message);
  }
  }

  return (
    <div className='container m-auto pt-4 w-full min-h-full md:w-3/4 custom-Scroll'>
        <h1 className='heading  text-center  dark:text-white'>Dashboard</h1>
        <form onSubmit={handleSubmit(handleUpload)}>
          <input type="text" {...register('name')} />
        <input type='file' {...register('file')}/>
        <button className='btn1' type='submit'>upload</button>
        </form>
    </div>
  )
}
