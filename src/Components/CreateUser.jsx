import React from 'react'
import uploadImg from '../images/uploadimg.png'
import Input from './subComponent/Input'
export default function CreateUser() {
  return (
    <div className='container  mt-4 m-auto p-3 pt-4 w-full md:w-2/3 '>
      <h1 className='heading  text-center   dark:text-white'>Create User</h1>
      <form className='w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]' action="">
        <h1 className='text-2xl'>User Details</h1>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='md:w-2/3'>
            <Input label='Name' className='input1'/>
            <Input label='Phone number' className='input1'/>
          
          </div>
          <div className='w-full  md:w-1/3 flex justify-center items-center '>
            <div className="upload-image w-1/2 md:w-full">
              <img src={uploadImg} alt="uplad image" />
              Upload Image
            </div>
          </div>
        </div>
        {/* Otp */}
        <div className='flex items-end justify-between mt-4'>
          <div className='w-1/5'>
            <Input className='input1' label='Otp on SMS'/>
          </div>
          <button className='btn1'>Generate Otp</button>
        </div>
        <Input className='input1' label='Email'/>
        <Input className='input1' label='Addhaar'/>
        <Input className='input1' label='Current Address'/>
        <Input className='input1' label='Permanent Address'/>
        <Input className='input1' label='License number'/>
      
        <div className='mt-8 flex flex-col items-center  md:flex-row md:justify-evenly gap-4'>
        <div className="upload-image w-1/2 md:w-1/3 ">
              <img src={uploadImg} alt="uplad image" />
              Upload Image
            </div>
            <div className="upload-image w-1/2 md:w-1/3">
              <img src={uploadImg} alt="uplad image" />
              Upload Image
            </div>
        </div>
        <div className='text-center mt-8'>

        <input type="submit" className='btn1 ' />
        </div>
      </form>
    </div>
  )
}
