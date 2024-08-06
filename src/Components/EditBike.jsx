import React, { useEffect, useRef, useState } from 'react'
import uploadImg from '../images/uploadimg.png'
import Input from './subComponent/Input'
import UploadImage from './subComponent/UploadImage'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './subComponent/Loader';
import Modals from './subComponent/Modals';

export default function EditBike() {
    const [bikeId, setBikeId] = useState(useParams().id);
    const [loader,setLoader] = useState(true);
    const [modalConfirm,setModalConfirm] = useState(false);
    const navigate = useNavigate();
    const submitInput = useRef();
    useEffect(() => {
        if (!bikeId  || bikeId === 'null')
            navigate('/manage/bike/edit-bike/')
    }, [bikeId])

    //this code is just for showing loader for 5 sec need to be removed after backend
    useEffect(() => {
        if(bikeId)
        {
            setTimeout(() => {
                setLoader(false)
            }, 5000);
        }
    }, [bikeId])

    const execute =()=>{
        submitInput.current.click();
    }
    return (
        <>
         {loader && <Loader/>}
         {modalConfirm && <Modals message={'Are you sure you want to Edit the bike details'} execute={execute} show={setModalConfirm}/>}
            <div className={`${loader?'hidden':''} container mt-4 m-auto pt-4  w-full md:w-3/4 `}>
              
                    <h1 className='heading  text-center  dark:text-white'>Edit Bike</h1>
                <form action="">
                    <div className="w-full  flex flex-col p-3 gap-6   md:flex-row">
                        <div className='col1  flex flex-col items-center gap-5 justify-between md:w-1/2'>
                            <div className=" w-1/2 ">
                                {/* <img src={uploadImg} alt="uplad image" />
                            Upload Image */}
                                <UploadImage className={'rounded-full w-[13rem]'} />
                            </div>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 className=''>Prices</h1>

                                <Input label='Starting' className='input1' />
                                <Input label='Per hour (extra)' className='input1' />
                                <Input label='Per hour' className='input1' />

                            </div>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 >Owner Details</h1>

                                <Input label='Name' className='input1' />
                                <Input label='Address' className='input1' />
                                <Input label='Addaar' className='input1' />
                            </div>
                        </div>
                        <div className='col2 md:w-1/2'>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 >Bike Details</h1>

                                <label className="inp-label1" htmlFor="bike-name">Name:</label>
                                <span id="bike-name" className='font-bold'>Honda Active</span>

                                <label className="inp-label1" htmlFor="RC-no">RC no.</label>
                                <span id="RC-no" className='font-bold'>MP MG 2356</span>

                                <Input label='PUC Date' type='date' className='input1' />
                                <Input label='Insurance number' type='date' className='input1' />
                                <Input label='Insurance Docs' className="input1" style={{ padding: 0, color: 'white' }} type="file" name="Insurance docs" accept="application/pdf,application/vnd.ms-excel" />


                                <Input label='chassis number' className='input1' />
                                <Input label='CC' className='input1' />
                                <Input label='Engine no.' className='input1' />


                                <div className="upload-image w-1/2 mt-4 mx-auto">
                                    <img src={uploadImg} alt="uplad image" />
                                    Upload Image
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex p-2'>
                        <input className='hidden' type="submit"  ref={submitInput}/>
                        <button className='mx-auto btn1' type='button' onClick={() => setModalConfirm(true)}>Submit</button>
                    </div>
                </form>
              
            </div>
        </>
    )
}
