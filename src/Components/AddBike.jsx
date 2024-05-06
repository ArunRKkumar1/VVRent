import React, { useState } from 'react'
import uploadImg from '../images/uploadimg.png'
import Input from './subComponent/Input'
import UploadImage from './subComponent/UploadImage'
import Toast from './subComponent/Toast'
export default function AddBike() {
    const [showToast,setShowToast] = useState(true)
    return (
        <>
            {showToast && <Toast show={setShowToast} message={'something went wrong'}/>}
            <div className='container m-auto pt-4 w-full md:w-3/4 '>
                <h1 className='heading  text-center  dark:text-white'>Add Bike</h1>
                <form action="">
                <div className="w-full  flex flex-col p-3 gap-6   md:flex-row">
                    <div className='col1  flex flex-col items-center gap-5 justify-between md:w-1/2'>
                        <div className=" w-1/2 ">
                            {/* <img src={uploadImg} alt="uplad image" />
                            Upload Image */}
                            <UploadImage className={'rounded-full w-[13rem]'}/>
                        </div>
                        <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                            <h1 className=''>Prices</h1>
                            <Input label='Starting' className='input1'/>
                            <Input label='Per hour (extra)' className='input1'/>
                            <Input label='Per hour' className='input1'/>
                        </div>
                        <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                            <h1 >Owner Details</h1>

                            <Input label='Name' className='input1'/>
                            <Input label='Address' className='input1'/>
                            <Input label='Addhaar number' className='input1'/>
                        </div>
                    </div>
                    <div className='col2 md:w-1/2'>
                    <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                            <h1 >Bike Details</h1>
                            <Input label='Name' className='input1'/>
                            <Input label='RC number' className='input1'/>
                            <Input label='PUC Date' className='input1'/>
                            <Input label='Insurance number' className='input1'/>
                            <Input label='Insurance Docs' className="input1"  style={{padding:0,color:'white'}} type="file" name="Insurance docs" accept="application/pdf,application/vnd.ms-excel" onChange={e=>console.log(e.target)}/>
                    
                            <Input label='chassis number' className='input1'/>
                            <Input label='CC' className='input1'/>
                            <Input label='Engine no.' className='input1'/>

                            <div className="upload-image mt-4 w-1/2 mx-auto">
                            <img src={uploadImg} alt="uplad image" />
                            Upload Image
                        </div>
                        </div>
                    </div>
                </div>
                <div className='flex p-2'>
                    <input   className='mx-auto btn1' type="submit" />

                </div>
                </form>
            </div>
        </>
    )
}
