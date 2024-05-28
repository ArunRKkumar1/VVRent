import { FaEye } from 'react-icons/fa';
import React, { useState } from 'react'
import Input from './subComponent/Input'
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"
import Error from './subComponent/Error';
import axios from 'axios';
import Loader from './subComponent/Loader';
import { useDispatch } from 'react-redux';
import { setJwt } from '../features/authSice.js';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        setLoader(true);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/admin/login', data);
            
            if (response.status === 200) {
             
                dispatch(setJwt(response.data.token));
                navigate("/");
            }
            setLoader(false);
            
        }
        catch (error) {
            console.log(error.message);
            setLoader(false);
           
        }
    })
    return (
        <>
        {loader && <Loader/>}
        <div className='container m-auto pt-4 w-full md:w-3/4 '>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form className='flex flex-col gap-4  items-center ' onSubmit={handleSubmit(onSubmit)}>
                <div className=' w-1/2'>

                    <Input className='input1' label='Email' type='email' {...register("email", {
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })} />
                    {errors.email && <Error message={errors.email.message} />}
                </div>

                <div className='w-1/2'>
                    <label className='block'>Password</label>
                    <div className='flex items-center radius1  outline  outline-1 bg-white '>
                        <input className='outline-remove radius1 text-black w-[90%]
                        ] border-none ' type={showPassword ? 'text' : 'password'} {...register('password', { required: "Required", minLength: { value: 8, message: "min length is 8 charaters" } })} />

                        <div className='w-[10%] text-lg flex justify-center px-2 text-black' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword
                                ? <FaEye />
                                : <FaEyeSlash />
                            }


                        </div>

                    </div>
                    {errors.password && <Error message={errors.password.message} />}
                </div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md w-fit' type='submit'>Login</button>
            </form>
        </div>
        </>
    )
}
