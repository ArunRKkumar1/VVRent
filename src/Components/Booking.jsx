import React, { useEffect, useState } from 'react'
import searchImg from "../images/search.svg"
import {SearchBar}  from './subComponent/SearchBar'
import { SearchResultsList } from './subComponent/SearchResultList'
import bikeListJson from '../Data/bikes.json'
import { data } from 'autoprefixer'
import Input from './subComponent/Input'
import Select from './subComponent/Select'
import { useForm } from 'react-hook-form'

//https://aegies.com/

//Booking Component is for booking ride 
export default function CreateUser() {
    const paymentModes = ['Paytm', 'PhonePay', 'BharatPay', 'GPay', 'Amazon Pay', 'Bharat UPI','Cash', 'Other']
    const [bikeList, setBikeList] = useState([]);
    const [bike, setBike] = useState({});

    // default time data
    const [currenTime, setCurrenTime] = useState({})

    //useForm configuration
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    // generate current time for default date and time
    const generateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    //set current time to input time
    useEffect(() => {
        const time = { date: new Date().toISOString().slice(0, 10), time: generateTime() }
        setCurrenTime(time);
    }, [])
    const fetchBikes = (input) => {
        console.log(input);
        const res = bikeListJson.filter((e) => {
            const { name, RC } = e;
            return name.toLowerCase().includes(input.toLowerCase()) || RC.includes(input.toUpperCase())
        })
        setBikeList(res);
    }

    return (
        <div className='container  mt-4 m-auto p-3 pt-4 w-full md:w-2/3 '>
            <h1 className='heading  text-center   dark:text-white'>Booking Ride</h1>
            <form className='w-full flex flex-col gap-7 ' action="">
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>User Details</h1>
                    <Input label={"Email"} className='input1' />
                    <button className='btn1 mt-3' type='button' >Find</button>

                    {/* Auto fill user Data */}
                    <div className="auto-fill">
                        <Input label={"Name"} className='input1 disabled:text-white' disabled />
                        <Input label={"Phone no."} className='input1 disabled:text-white' disabled />
                        <Input label={"Permanent Address"} className='input1 disabled:text-white' disabled />
                        <Input label={"Current Address"} className='input1 disabled:text-white'  disabled />
                    </div>
                </div>

                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Bike Details</h1>

                    <label className='inp-label1' htmlFor="email">Bike:</label>
                    <div className="search-input">

                        <SearchBar picked={bike.name ? bike.name + " " + bike.RC : ""} setPick={setBike} fetch={fetchBikes} />
                        {bike.length === 0 && bikeList && bikeList.length > 0 && <div className="results-list ">
                            {bikeList?.map((result, id) => {
                                return <div key={id}
                                    className="search-result"
                                    onClick={(e) => { if (result.available) setBike(result) }}
                                >
                                    <div>
                                        {result.name}
                                    </div>
                                    <div className='flex gap-4'>
                                        <div>
                                            {result.RC}
                                        </div>
                                        <div className={`${result.available ? 'text-green-400' : 'text-red-500'}`}>

                                            {result.available ? 'Available' : 'Allotted'}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>}
                    </div>
                    <div className="auto-fill text-white">
                        <Input label='Bike Name' disabled className='input1 '  value={bike.bike ? bike.bike : ''} />
                        <Input label='Bike RC' disabled className='input1 '  value={bike.RC ? bike.RC : ''} />
                    </div>

                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Advance Payment</h1>
                    <Input label="Amount" className='input1 w-1/3' />
                    <div className='mt-4'>
                        <label className='inp-label1' >Payment Mode</label>
                        <Select className='w-1/3' options={paymentModes} defaultValue={'Select Payment Mode'} />
                    </div>
                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                    <h1 className='text-2xl'>Booking Time</h1>
                    <div className="flex gap-5">
                        <span >
                            <Input inputClass='text-black' className="input1 w-auto" label="Start date" type='date' defaultValue={currenTime.date} />
                        </span>
                        <span >
                            <Input inputClass='text-black' className="input1 w-auto" label="Start time" type='time' defaultValue={currenTime.time} />
                        </span>
                    </div>
                        <div className="flex gap-4 items-end ">
                            <Input type='number' defaultValue='3' min='1' max='23' maxLength='2' className='input1 w-1/3' label='duration'/>
                            <Select className='w-1/4' options={[ 'Days']} defaultValue={'Hours'} />
                        </div>
                   
                </div>
                <div className='input-container  w-full radius1 p-4 mt-4 text-white  bg-[#3B4179] dark:bg-[#222222]'>
                <h1 className='text-2xl'>Accessories</h1>
                    <Input type='number' label='Helmet no.' className='input1 w-1/3'/>
                </div>
                <div className='text-center mt-8'>
                    <input type="submit" className='btn1 ' />
                </div>
            </form>
        </div>
    )
}
