import React, { useEffect, useState } from 'react'
import uploadImg from '../images/uploadimg.png'
import Input from './subComponent/Input'
import UploadImage from './subComponent/UploadImage'
import Toast from './subComponent/Toast'
import Loader from './subComponent/Loader'
import { useForm, Form } from 'react-hook-form'
import Modal from './subComponent/Modals'
import ErrorDialog from './subComponent/Error'
import { POST } from '../utils/apiCalls.js'
import {useNavigate} from 'react-router-dom'
export default function AddBike() {
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [bikeImage, setBikeImage] = useState(null);
    const navigate = useNavigate()
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        document.title = 'Add Bike';
      }, []);
    const handleFormCheck = () => {
        setShowModal(true)

    }
    const onSubmitHandler = handleSubmit(async (data) => {
        setShowLoader(true);
    
        const formData = new FormData();
        if(bikeImage)
            formData.append('bikeImage',bikeImage);

        for (const key in data) {
            if ( key === 'insuranceDocs' || key === 'rcDocs') {
                // Access the first file directly
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }
        
        await POST('/bikes/addBike', formData).then((res) => {
            setToastMessage(res.data.message);
            setShowToast(true);
            setTimeout(() => {
                navigate('/')
            }, 3000);

        }).catch((err) => {
            setToastMessage(err.message);
            setShowToast(true);
        }
        )
           setShowLoader(false)
    });
    return (
        <>
            {showLoader && <Loader />}
            {showModal && <Modal show={setShowModal} execute={onSubmitHandler} message={'Are you sure you want to add this bike'} />}
            {showToast && <Toast setShow={setShowToast} message={toastMessage} />}
            <div className='container m-auto pt-4 w-full md:w-3/4 '>
                <h1 className='heading  text-center  dark:text-white'>Add Bike</h1>
                <Form onSubmit={handleSubmit(handleFormCheck)} control={control} >
                    <div className="w-full  flex flex-col p-3 gap-6   md:flex-row">
                        <div className='col1  flex flex-col items-center gap-5 justify-between md:w-1/2'>
                            <div className=" w-1/2 ">
                                {/* <img src={uploadImg} alt="uplad image" />
                            Upload Image */}
                                <UploadImage className={'rounded-full w-[13rem]'} 
                                setIMG={setBikeImage}
                                />
                            </div>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 className=''>Prices</h1>
                                <Input label='Starting' className='input1'  {...register("startPrice", { required: true })} />
                                {errors.startPrice && <ErrorDialog message="required" />}

                                <Input label='Per hour' className='input1' {...register("perHour", { required: true })} />
                                {errors.perHour && <ErrorDialog message="required" />}

                                <Input label='Per hour (extra)' className='input1'{...register("perHourExtra", { required: true })} />
                                {errors.perHourExtra && <ErrorDialog message="required" />}

                                <Input label='Per Day' className='input1'{...register("perDay", { required: true })} />
                                {errors.perHourExtra && <ErrorDialog message="required" />}

                            </div>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 >Owner Details</h1>

                                <Input label='Name' className='input1' {...register("ownerName", { required: true })} />
                                {errors.ownerName && <ErrorDialog message="required" />}

                                <Input label='Address' className='input1' {...register("ownerAddress", { required: true })} />
                                {errors.ownerAddress && <ErrorDialog message="required" />}

                                <Input label='Phone number' className='input1' {...register("ownerPhone", { required: true })} />
                                {errors.ownerPhone && <ErrorDialog message="required" />}

                                <Input label='Addhaar number' className='input1' {...register("ownerAadhaar", { required: true })} />
                                {errors.ownerAadhaar && <ErrorDialog message="required" />}


                            </div>
                        </div>
                        <div className='col2 md:w-1/2'>
                            <div className="input-container bg-[#3B4179] dark:bg-[#222222]">
                                <h1 >Bike Details</h1>
                                <Input label='Name' className='input1' {...register("bikeName", { required: true })} />
                                {errors.bikeName && <ErrorDialog message="required" />}

                                <Input label='RC number' className='input1' {...register("rcNumber", { required: true })} />
                                {errors.rcNumber && <ErrorDialog message="required" />}

                                <Input label='PUC Date' className='input1' {...register("pucNumber", { required: true })} />
                                {errors.pucNumber && <ErrorDialog message="required" />}

                                <Input label='Insurance number' type='number' className='input1' {...register("insuranceNumber", { required: true })} />
                                {errors.insuranceNumber && <ErrorDialog message="required" />}

                                <Input label='Insurance Document' className="input1" style={{ padding: 0, color: 'white' }} type="file" name="Insurance docs" accept="application/pdf,image/*,application/vnd.ms-excel"  {...register("insuranceDocs", { required: true })} />
                                {errors.insuranceDocs && <ErrorDialog message="required" />}

                                {/* <Input label='RC Document' className="input1"  style={{padding:0,color:'white'}} type="file" name="Insurance docs" accept="application/pdf,image/*,application/vnd.ms-excel" onChange={e=>setFile(e.target.files[0])} /> */}

                                <Input label='RC Document' className="input1" style={{ padding: 0, color: 'white' }} type="file" name="RC  docs" accept="application/pdf,image/*,application/vnd.ms-excel"  {...register("rcDocs", { required: true })} />
                                {errors.rcDocs && <ErrorDialog message="required" />}


                                <Input label='chassis number' className='input1' {...register("chassisNumber", { required: true })} />
                                {errors.chassisNumber && <ErrorDialog message="required" />}

                                <Input label='CC' className='input1' {...register("bikeCC", { required: true })} />
                                {errors.bikeCC && <ErrorDialog message="required" />}

                                <Input label='Engine no.' className='input1' {...register("engineNumber", { required: true })} />
                                {errors.engineNumber && <ErrorDialog message="required" />}
                            </div>
                        </div>
                    </div>
                    <div className='flex p-2'>
                        <input className='mx-auto btn1' type="submit" />

                    </div>
                </Form>
            </div>
        </>
    )
}
