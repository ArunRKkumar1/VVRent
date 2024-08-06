import React, { useEffect, useState } from 'react'
import uploadImg from '../images/uploadimg.png'
import Input from './subComponent/Input'
import UploadImage from './subComponent/UploadImage'
import Error from './subComponent/Error'
import OtpInput from 'react-otp-input';
import { useForm } from "react-hook-form"
import { POST } from '../utils/apiCalls'
import Toast from './subComponent/Toast'
import Loader from './subComponent/Loader'
import { useNavigate } from 'react-router-dom'


// form page 1
function FormOTP({ otp, setOtp }) {

  return (
    <div className='w-[30rem] flex flex-col gap-4  m-auto mt-[5rem]'>
      <div className='text-center text-3xl '>Enter Otp</div>


      <div className='flex justify-center'>
        <OtpInput
          inputStyle={{ boxSizing: "border-box", borderRadius: '.4rem', color: "black", width: '4rem', height: "5rem", textAlign: "center", fontSize: "2rem" }}
          skipDefaultStyles={true}
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input   {...props} />}
        />
      </div>
    </div>
  );
}

//form page 0
const FormPage = ({ register, errors, setProfile }) => {
  return <>
    <div >
      <h1 className='text-2xl'>User Details</h1>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='md:w-2/3'>
          <Input label='Name' className='input1' {...register("name", { required: { value: true, message: "Enter valid name" } })} />
          {errors.name && <Error message={errors.name.message} />}
          <Input label='Phone number (+91)' type="number" className='input1' {...register("phone", { required: { value: true, message: "Invalid number" }, minLength: { value: 10, message: "Invalid number" }, maxLength: { value: 10, message: "Invalid number" } })} />
          {errors.phone && <Error message={errors.phone.message} />}
        </div>
        <div className='w-full  md:w-1/3 flex justify-center items-center '>
          <div className=" w-1/2 ">
            {/* <img src={uploadImg} alt="uplad image" />
                            Upload Image */}
            <UploadImage className={'rounded-full w-[13rem]'} setIMG={setProfile} />
          </div>
        </div>
      </div>
      <Input className='input1' label='Email' {...register("email", { required: { value: true, message: "Enter valid email " }, pattern: { value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/, message: 'invalid email only (gmail, yahoo) domain are allowed' } })} />
      {errors.email && <Error message={errors.email.message} />}

      <Input className='input1' label='Aadhaar' type="number" {...register("aadhaar", { required: { value: true, message: "Enter Aadhar Number" }, minLength: { value: 12, message: "Invalid aadhaar" }, maxLength: { value: 12, message: "Invalid aadhaar" } })} />
      {errors.aadhaar && <Error message={errors.aadhaar.message} />}

      <Input className='input1' label='Current Address' {...register("currentAddress", { required: { value: true, message: "Current Address is required" } })} />
      {errors.currentAddress && <Error message={errors.currentAddress.message} />}
      <Input className='input1' label='Permanent Address'  {...register("permanentAddress", { required: { value: true, message: "Permanent Address is required" } })} />
      {errors.permanentAddress && <Error message={errors.permanentAddress.message} />}

      <Input className='input1' label='License number' {...register("licenseNumber", { required: { value: true, message: "License number is required" } })} />
      {errors.licenseNumber && <Error message={errors.licenseNumber.message} />}
      <div className='mt-8 flex flex-col     gap-4'>
        <div className="">
          <Input type='file' className='input1' inputClass='text-white' label='Upload Aadhaar' {...register('aadhaarDoc', { required: { value: true, message: "Aadhaar document is required" } })} />
          {errors.aadhaarDoc && <Error message={errors.aadhaarDoc.message} />}

          <Input type='file' className='input1' inputClass='text-white' label='Upload License'  {...register('licenseDoc', { required: { value: true, message: "License document is required" } })} />
          {errors.licenseDoc && <Error message={errors.licenseDoc.message} />}
        </div>
      </div>
    </div>
  </>
}


export default function CreateUser() {

  const [page, setPage] = useState(0);
  const [showToast , setShowToast] = useState(false);
  const [toastMessage , setToastMessage] = useState('');
  const [showLoader , setShowLoader] = useState(false);
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  //page toggle
  const getPage = () => {
    if (page === 0) {
      return <FormPage register={register} errors={errors} setProfile={setProfile} />
    }
    else if (page === 1) {
      return <FormOTP className='w-full' otp={otp} setOtp={setOtp} />
    }
  }
  // submitting form
  const onSubmit = handleSubmit(async (data) => {
    if (otp.length !== 6) {
      alert("Enter valid Otp");
      return;
    }
    setShowLoader(true)
    const formData = new FormData();
    formData.append('otp', otp);
   
    formData.append('profile', profile);

    for (const key in data) {
      
      if (key === 'aadhaarDoc' || key === 'licenseDoc') {
        // Access the first file directly
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    
    await POST('/users/register', formData).then((res) => {
      setToastMessage(res.data.message)
      setShowToast(true);
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }).catch((err) => {
      setToastMessage(err.data.message)
      setShowToast(true);
    })
    
    setShowLoader(false)
  })
  //next page if no error
  const handleNextPage = handleSubmit( async(data) => {
  
    setOtp("")
    setShowLoader(true)
    await POST('/users/send-otp',{email:data.email}).then((res)=>{
      console.log(res.data.message);
      setToastMessage(`Otp is send to ${data.email} and +91 ${data.phone}`);
      setShowToast(true);
      setPage(1);
    }).catch((err)=>{
      console.log(err);
      setToastMessage(err.message);
      setShowToast(true);
    })
    setShowLoader(false)
  })
  return (
    <>
  {showToast && <Toast setShow={setShowToast} message={toastMessage} />}
  {showLoader && <Loader />}
    <div className='container  mt-4 m-auto p-3 pt-4 w-full md:w-2/3 '>
      <h1 className='heading  text-center   dark:text-white'>Create User</h1>
      <form className='w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]' onSubmit={handleSubmit(onSubmit)}>
        {getPage()}

        <div className='flex justify-center gap-5  mt-7'>

          {page === 1 && <button className='btn1' onClick={() => setPage(0)}>Back</button>}
          <input className='hidden' type="submit" />

          {page === 0 && <button className='btn1' onClick={handleNextPage}>Next</button>}
          {page === 1 && <input className='btn1' type="submit" />}
          {/* <button onClick={()=>console.log(errors)}>erorrs</button> */}
        </div>
      </form>
    </div>
    </>
  )
}
