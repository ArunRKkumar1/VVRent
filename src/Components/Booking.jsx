import React, { useEffect, useMemo, useState } from 'react'
import searchImg from "../images/search.svg"
import { SearchBar } from './subComponent/SearchBar'
import { SearchResultsList } from './subComponent/SearchResultList'
// import bikeListJson from '../Data/bikes.json'
import { data } from 'autoprefixer'
import Input from './subComponent/Input'
import Select from './subComponent/Select'
import { useForm } from 'react-hook-form'
import { GET } from '../utils/apiCalls.js'
import Error from './subComponent/Error.jsx'

//https://aegies.com/

//Booking Component is for booking ride 
export default function CreateUser() {
    const paymentModes = ['Other','Paytm', 'PhonePay', 'BharatPay', 'GPay', 'Amazon Pay', 'Bharat UPI', 'Cash']
    const [bikeList, setBikeList] = useState([]);
    const [bike, setBike] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [userData, setUserData] = useState({})
    const [bikesData, setBikesData] = useState([]);

    // default time data
    const [currenTime, setCurrenTime] = useState({ date: '', time: '' });


    //useForm configuration
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    //fetch all the bikes
  const handleGetBikeList = async()=>{
        await GET(`/bikes/listBikes`).then((res)=>{
            
            setBikesData(res.data)
        }).catch(err=>console.log(err))
    }
    // generate current time for default date and time
    const generateTime = () => {
        handleGetBikeList();
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
  
    //set current time to input time and fetch bikeList
    // useEffect(() => {
    //     const time = { date: new Date().toISOString().slice(0, 10), time: generateTime() }
    //     setCurrenTime(time);
    // }, [])

    useEffect(() => {
        const time = { date: new Date().toISOString().slice(0, 10), time: generateTime() };
        setCurrenTime(time);
        setValue('bookingDate', time.date);  // Set form default value for bookingDate
        setValue('bookingTime', time.time);  // Set form default value for bookingTime
        handleGetBikeList(); // Assuming handleGetBikeList fetches the bike list
    }, []);

    const filterBikeList = (input) => {
        // console.log(input);
        const res = bikesData.filter((e) => {
            const { bikeName, rcNumber } = e;
            return bikeName.toLowerCase().includes(input.toLowerCase()) || rcNumber.includes(input.toUpperCase())
        })
        setBikeList(res);
    }

    // Find user Credential
    const handleFindUser = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(userEmail))
        {
            alert("Invalid email format");
            return;
        }
        await GET(`/users/getUserCredentials/${userEmail}`).then((res) => {
            setUserData(res.data)
        }).catch(err => alert("User data not available"))
    }
    const submit = async (data) => {
        if(!userData || !bike)
        {
            alert('Enter User and bike details');
            return;
        }
        const reqData = {
            ...data,
            bikeId: bike._id,
            bikeName: bike.bikeName,
            rcNumber: bike.rcNumber,
            userId: userData._id,
            userName: userData.name,
            userEmail,
            userLicense: userData.licenseNumber,
            userAadhaar: userData.aadhaar,
            userPhone: userData.phone,

        }
        console.log(reqData);
    }
    return (
        <div className='container  mt-4 m-auto p-3 pt-4 w-full md:w-2/3 '>
            <h1 className='heading  text-center   dark:text-white'>Booking Ride</h1>
            <form className='w-full flex flex-col gap-7 ' onSubmit={handleSubmit(submit)}>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>User Details</h1>
                    <Input label={"Email"} className='input1' value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                    <button className='btn1 mt-3' type='button' onClick={handleFindUser} >Find</button>

                    {/* Auto fill user Data */}
                    <div className="auto-fill">
                        <div className='flex flex-col mt-2'>
                            <label >Name</label>
                            <label className='bg-gray-500 p-2 radius1'>{userData.name}</label>
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label >Phone no.</label>
                            <label className='bg-gray-500 p-2 radius1'>{userData.phone}</label>
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label >Addhaar Number</label>
                            <label className='bg-gray-500 p-2 radius1'>{userData.aadhaar}</label>
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label >License Number</label>
                            <label className='bg-gray-500 p-2 radius1'>{userData.licenseNumber}</label>
                        </div>

                    </div>
                </div>

                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Bike Details</h1>

                    <label className='inp-label1' htmlFor="email">Bike:</label>
                    <div className="search-input">

                        <SearchBar picked={bike.bikeName ? bike.bikeName + " " + bike.rcNumber : ""} setPick={setBike} fetch={filterBikeList} />
                        {bike.length === 0 && bikeList && bikeList.length > 0 && <div className="results-list ">
                            {bikeList?.map((result, id) => {
                                return <div key={id}
                                    className="search-result"
                                    onClick={(e) => { if (result.status ==='available') setBike(result) }}
                                >
                                    <div>
                                        {result.bikeName}
                                    </div>
                                    <div className='flex gap-4'>
                                        <div>
                                            {result.rcNumber}
                                        </div>
                                        <div className={`${result.status ==='available' ? 'text-green-400' : 'text-red-500'}`}>

                                            {result.status }
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>}
                    </div>
                    <div className="auto-fill text-white">
                        <div className='flex flex-col mt-2'>
                            <label >Bike Name</label>
                            <label className='bg-gray-500 p-2 radius1'>{bike.bikeName}</label>
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label >Bike RC</label>
                            <label className='bg-gray-500 p-2 radius1'>{bike.rcNumber}</label>
                        </div>
                       </div>

                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Advance Payment</h1>
                    <Input label="Amount" type='number' className='input1 w-1/3' {...register('advanceAmount', {required:true})}/>
                    {errors.advanceAmount && <Error message={"required, atleast enter 0"} />}
                    <div className='mt-4'>
                        <label className='inp-label1 underline' >Payment Mode</label>
                        <div className='mt-3 '>
                            <label>Select Payment Mode</label>
                        <Select className='w-1/3' options={paymentModes} {...register('paymentMode')} />
                        {errors.paymentMode && <Error message={errors.paymentMode.message} />}
                        </div>
                    </div>
                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Booking Time</h1>
                    <div className="flex gap-5">
                        <span >
                            <Input inputClass='text-black' className="input1 w-auto" label="Start date" type='date' defaultValue={currenTime.date} {...register('bookingDate')} />
                            {errors.bookingDate && <Error message={errors.bookingDate.message} />}
                        </span>
                        <span >
                            <Input inputClass='text-black' className="input1 w-auto" label="Start time" type='time' defaultValue={currenTime.time} {...register('bookingTime')}/>
                            {errors.bookingTime && <Error message={errors.bookingTime.message} />}
                        </span>
                    </div>
                    <div className="flex gap-4 items-end ">
                        <Input type='number' defaultValue='3' min='1' max='23' maxLength='2' className='input1 w-1/3' label='duration' {...register('bookingDuration')}/>
                        <Select className='w-1/4' options={['Days']} defaultValue={'Hours'} {...register('bookingPeriod')}/>
                        {errors.bookingDuration && <Error message={errors.bookingDuration.message} />}
                    </div>

                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Accessories</h1>
                    <Input type='number' label='Helmet no.' className='input1 w-1/3' {...register("helmet")} />
                </div>
                <div className='text-center mt-8'>
                    <input type="submit" className='btn1 ' />
                </div>
            </form>
        </div>
    )
}
