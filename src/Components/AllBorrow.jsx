import Input from './subComponent/Input'
import React, { useEffect, useState } from 'react'
import ListAccordian from './subComponent/ListAccordian'
import { Link } from 'react-router-dom';
import { GET, PUT } from '../utils/apiCalls.js';
import Loader from './subComponent/Loader.jsx';
import Toast from './subComponent/Toast.jsx';
import moment from 'moment'

export default function AllBorrow() {
    //All data fetched from Server
    const [borrowDatas, setBorrowDatas] = useState([]);
    // Filter data from all borrowDetails
    const [borrow, setBorrow] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [pendingborrowsShow, setPendingborrowsShow] = useState(true);
    const [completedborrowsShow, setCompletedborrowsShow] = useState(false);

    const [loading,setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    //Custom function to show all borrow details for List Accordian
    const completeborrow = async(id)=>{
        setLoading(true);
         PUT(`/borrow/complete-borrow/${id}`)
         .then(()=>{
            alert("Refund done")
            getborrows();
         }).catch((err)=>{
            setShowToast(true);
            setToastMessage(err.message);
         }).finally(()=>{
            setLoading(false);
         })
    }
    const ListAccordianDetail = ({ data }) => {

        const details = { 'User Name': data.userName, 'Return Borrow Date and Time': data.returnTime, 'Amount': data.amount, status: data.status, "Date and time": moment(data.createdAt).format("Do MMMM YYYY - h:mm A") };
        return <>
            <div className='p-2 text-sm md:p-4 mt-4 flex flex-col gap-3 md:grid md:grid-cols-2  md:text-base'>

                <div className='flex flex-col gap-2'>

                    {Object.entries(details).map(([key, value]) => (
                        <div key={key} className='grid grid-cols-2'>
                            <div className='flex justify-between'> <span>{key} </span><span>:&nbsp; &nbsp;</span></div>
                            <div>{value}</div>
                        </div>
                    ))}
                    <Link className='text-red-500 underline' to={`/manage/user/all-user/user-details/${data.userId}`} >About User</Link>

                    {data.status === "pending" && <button className='btn1' onClick={()=>completeborrow(data._id)}>Complete borrow</button>}
                    {/* <Link className='text-red-500 underline' to={`/manage/booking/allBikes/bikeDetails/${data.userId}`} >About Bike</Link> */}

                    {/* <Link className='text-red-500 underline' to={`/manage/borrow/endRide/${data._id}`} >End Ride</Link> */}

                </div>
            </div>
        </>
    }
    // function to filter data from all borrowDetails
    const handleSearch = (data) => {
        setSearchInput(data.target.value);
        const filterValue = data.target.value;
        const allborrow = borrowDatas.filter((user) => {
            return user.userName.toLowerCase().includes(filterValue.toLowerCase()) || user.phone.startsWith(filterValue.toLowerCase())
        })
        setBorrow(allborrow);
    }

    // this function will be replaced when backend is developed and 
    // data will be fetched from backend
    useEffect(() => {
       getborrows()
    }, [pendingborrowsShow, completedborrowsShow])

    const getborrows = async () => {
        let condition =""
        if (pendingborrowsShow && completedborrowsShow)
            condition ="all";
        else if (pendingborrowsShow)
            condition ="pending";
        else
            condition ="done";
        await GET(`/borrow/all/?status=${condition}`).then(res => {
            setBorrowDatas(res.data)
            setBorrow(res.data)
        })

    }

    return (
        <>
        {loading && <Loader/>}
        {showToast && <Toast message={toastMessage} setShow={setShowToast}/>}
        <div className='container mt-4 m-auto pt-4 w-full min-h-full md:w-3/4 custom-Scroll'>
            <h1 className='heading  text-center  dark:text-white'>All Borrowers</h1>
            {/* search to shortlist bikes from bike name, rc or owner name */}
            <div className='flex items-center gap-6 justify-end mt-12  '>

                <Input inputClass='bg-gray-200 border border-black' label='Filter' className='input1 mr-4 md:mr-0 md:w-1/4' placeholder='User name, Phone no.' onChange={handleSearch}
                />
                {/* <button className='btn1 ' onClick={handleSearch} >Search</button> */}

            </div>

            <div className='flex gap-4'>
                <div className='flex items-center gap-1'>
                    <input checked={pendingborrowsShow} type="checkbox" onChange={() => setPendingborrowsShow(e => !e)} />
                    <label htmlFor="">Pending</label>
                </div>
                <div className='flex items-center gap-1'>
                    <input checked={completedborrowsShow} type="checkbox" onChange={() => setCompletedborrowsShow(e => !e)} />
                    <label htmlFor="">Complete</label>
                </div>
            </div>

            {/* show all borrows */}
            <div className='mt-5 border-2 border-black dark:border-white  radius1 p-3'>
                <div className="w-full p-2  grid grid-cols-4 gap-4 text-sm md:text-base" >
                    <div className="text-center  dark:bg-[#222222] p-1">User name</div>
                    <div className="text-center  dark:bg-[#222222] p-1">borrow Amount</div>
                    <div className=" text-center  dark:bg-[#222222] p-1 ">Phone number </div>
                    <div className=" text-center  dark:bg-[#222222] p-1 ">Status</div>
                </div>
                <ul className=' list-none mt-4 w-full flex flex-col gap-1 h-[50vh] overflow-y-scroll'>
                    {borrow?.map((ref, id) => {
                        return (
                            <span key={id} className={id % 2 === 0 ? 'bg-gray-300 dark:bg-[#2b2b2b]' : 'bg-gray-400 dark:bg-[#111111]'}>
                                <ListAccordian data={ref} heading={[ref.userName, ref.amount, ref.phone, ref.status]} ListAccordianDetail={ListAccordianDetail} />

                            </span>
                        )
                    })}




                </ul>
            </div>
        </div>
        </>
    )
}
