import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GET, POST } from '../utils/apiCalls';
import Toast from './subComponent/Toast';
import Input from './subComponent/Input';
import { useForm, Form } from 'react-hook-form'
import Error from './subComponent/Error';

export default function ExtendBooking() {
    const bookingId = useParams().id;
    const [responseData, setResponseData] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [bookingDetails, setBookingDetails] = useState({});
    const [billingData, setBillingData] = useState({});
    const [afterAdvanceAmount, setAfterAdvanceAmount] = useState("");
    const [refundNumberDefault, setrefundNumberDefault] = useState("");
    const [toggleCreateRefund, setToggleCreateRefund] = useState(false)
    const [toggleCreateBorrow, setToggleCreateBorrow] = useState(false)
    const [helmetConfirmation,setHelmetConfirmation] = useState(-1);
    const navigater = useNavigate();
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    async function fetchBillingDetails() {
        await GET(`/booking/booking-receipt/${bookingId}`).then(res => {
            setResponseData(res.data);
            if(res.data.totalFair<res.data.advanceAmount )
                {
                    setToggleCreateRefund(true)
                }
    
        }).catch(e => {
            setShowToast(true);
            setToastMessage(e.message);
        })
    }
    useEffect(() => {
        createBillingData();
    }, [responseData])

    //transforming billing data to visible to the user
    function createBillingData() {
        const durationType = responseData.durationType;
        const bookingData = {
            "Client Name": responseData.userName,
            "Bike Name": responseData.bikeName,
            "Booking Date": responseData.bookingDate,
            "booking Time": responseData.bookingTime,
            "Booking Duration": responseData.graceDuration + " " + durationType,
            "Riding Duration": responseData.ridingDuration + " " + durationType,
            "Bike Starting Charge": responseData.bikeStartingFair + ' /3h',
            "Bike Per Hour Charge": responseData.bikePerHourFair + ' /h',
            "Bike Per Hour Extra charge": responseData.bikePerHourExtraFair + " /h",
            
        }
        console.log(bookingData);
        const remainingPayment = responseData.advanceAmount- responseData.totalFair;
        const billingDetails = {
            "Grace Fair": responseData.gracefair + " /-",
            "Extra Duration Fair": responseData.extraFair + " /-",
            "Total Fair": responseData.totalFair + " /-",
            "Advance Deposit": responseData.advanceAmount+"/-",
            "Remaining Payment": remainingPayment>0?remainingPayment+"/- Refund":Math.abs(remainingPayment)+"/- From Client"
        }
        setAfterAdvanceAmount(responseData.advanceAmount - responseData.totalFair)
        setrefundNumberDefault(responseData.refundPhoneNumber)
        console.log(responseData.phone);
        setBookingDetails(bookingData);
        setBillingData(billingDetails);
    }
    useEffect(() => {
        fetchBillingDetails();
    }, [])

    //submitting and complete the booking
    async function submit(data) {
        if(helmetConfirmation == -1)
        {
            alert("Write Helmet number");
            return;
        }
        if(helmetConfirmation != responseData.helmet)
        {
            alert("Helmet is change")
        }
        await POST(`/booking/booking-receipt/end/${bookingId}`,
            {...data,userName:responseData.userName,userId: responseData.userId, doRefund:toggleCreateRefund,
                doBorrow:toggleCreateBorrow,
                totalFair:responseData.totalFair,
                totalDuration:responseData.ridingDuration,
                bikeId:responseData.bikeId,
                
             }).then(e=>{
            setShowToast(true)
            setToastMessage("Ride end")
            setTimeout(() => {
               navigater("/")
            }, 1000);
        }).catch(e=>{
            console.log(e);
            setShowToast(true)
            setToastMessage(e.message)
        })
    }
    return (<>
        {showToast && <Toast message={toastMessage} setShow={setShowToast} />}
        <div className='container m-auto pt-4 w-full md:w-3/4 '>
            <h1 className='heading  text-center  dark:text-white'>End Booking </h1>
            <div className='mt-5'>

                <section name="Booking Details">
                    <h1 className='text-xl text-center dark:text-white mt-4' >Booking Details</h1>
                    <div className='md:w-[50%] p-3 m-auto  '>
                        {bookingDetails && Object.entries(bookingDetails).map(([key, value], index) => (
                            <div key={key} className={` p-1 grid grid-cols-2 auto-cols-fr gap-0 ${index % 2 === 0 ? 'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}`}>

                                <div>{key} </div>
                                <div>: {value}</div>
                            </div>
                        ))}

                    </div>
                </section>
                <section name="Accessories Details">
                    <h1 className='text-xl text-center dark:text-white mt-4' >Accessories Details</h1>
                    <div className='md:w-[50%] p-3 m-auto  '>

                        <div className={` p-1 grid grid-cols-2 auto-cols-fr gap-0 bg-gray-300 dark:bg-[#2b2b2b]`}>

                            <div>Helmet</div>
                            <div>: {responseData.helmet!== -1 ? responseData.helmet : ""}</div>
                        </div>
                        <div className={` p-1 grid grid-cols-2 auto-cols-fr gap-0 bg-gray-300 dark:bg-[#2b2b2b]`}>

                            <div className='text-red-600'>Write Helmet No.</div>
                            <input className='text-black' type="text" onChange={e=>setHelmetConfirmation(e.target.value)}/>
                        </div>


                    </div>
                </section>
                <section name="Billing details">

                    <h1 className='text-xl text-center dark:text-white mt-4' >Billing Details</h1>
                    <div className='md:w-[50%] p-3 m-auto  '>
                        {bookingDetails && Object.entries(billingData).map(([key, value], index) => (
                            <div key={key} className={`p-1 grid grid-cols-2 auto-cols-fr gap-0 ${index % 2 === 0 ? 'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}`}>

                                <div>{key} </div>
                                <div>: {value}</div>
                            </div>
                        ))}

                    </div>
                </section>

                <section name="Refund and Borrow details">
                    <div className='md:w-[50%] p-3 m-auto flex justify-center mt-4'>
                        {/* For Refun */}
                       {responseData&& responseData.totalFair<responseData.advanceAmount && <span className=''>

                            <input type='checkbox' defaultChecked={toggleCreateRefund} onChange={() => setToggleCreateRefund(e => !e)} /> Create Refund
                        </span>}
                        {/* For Borrow */}
                       {responseData&& responseData.totalFair>responseData.advanceAmount && <span className=''>

                            <input type='checkbox' defaultChecked={toggleCreateRefund} onChange={() => setToggleCreateBorrow(e => !e)} /> Create Borrow (Udhari)
                        </span>}
                    </div>
                    <form onSubmit={handleSubmit(submit)}>

                        {/* Editing Refund */}
                        {toggleCreateRefund && <div >
                            <h1 className='text-xl text-center dark:text-white ' >Refund Details</h1>
                            <div className='md:w-[50%] p-3 m-auto  '>
                                <div className={`p-1 grid grid-cols-2 auto-cols-fr gap-0 bg-gray-300 dark:bg-[#2b2b2b] `}>
                                    <div>Default Refund Number</div>
                                    <div>

                                        {refundNumberDefault && <Input className='input1' type="text" {...register("phone", { value: responseData.refundPhoneNumber }, {
                                            required: { value: true, message: "Invalid number" }, minLength: { value: 10, message: "Invalid number" }, maxLength: { value: 10, message: "Invalid number" }
                                        })} />}
                                        {errors.phone && <Error message={errors.phone.message} />}
                                    </div>
                                </div>
                                <div className={`p-1 grid grid-cols-2 auto-cols-fr gap-0 bg-gray-400 dark:bg-[#111111]`}>
                                    <div>Refund Amount</div>
                                    <div>
                                        {afterAdvanceAmount && <Input className='input1' type="text"
                                            {...register("afterAdvanceAmount", { value: afterAdvanceAmount })} />}
                                        {errors.refundAmount && <Error message={errors.phone.message} />}
                                    </div>
                                </div>

                            </div>
                        </div>}
                        {/* Editing Borrow */}
                        {toggleCreateBorrow && <div >
                            <h1 className='text-xl text-center dark:text-white ' >Refund Details</h1>
                            <div className='md:w-[50%] p-3 m-auto  '>
                                <div className={`p-1 grid grid-cols-2 auto-cols-fr gap-0 bg-gray-400 dark:bg-[#111111]`}>
                                    <div>Refund Amount</div>
                                    <div>
                                        {afterAdvanceAmount && <Input className='input1' type="text"
                                            {...register("afterAdvanceAmount", { value: Math.abs(afterAdvanceAmount) })} />}
                                        {errors.refundAmount && <Error message={errors.phone.message} />}
                                    </div>
                                </div>

                            </div>
                        </div>}
                        <div className='flex justify-center'>
                            <button className=' btn1 text-center' type="Submit" >End Ride</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </>
    )
}
