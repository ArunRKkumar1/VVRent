import React, { useEffect, useState } from 'react'
import reactDom from 'react-dom';
import { FaExclamation } from "react-icons/fa";
import { motion } from "framer-motion";
import { set } from 'react-hook-form';

export default function Toast({message,setShow}) {

    const [onClose ,setOnClose] = useState(false)
useEffect(()=>{
  setTimeout(()=>{
    setOnClose(true);
  },3000)
  setTimeout(() => {
    setShow(false);
  }, 4000);
},[])
const animationOpen = {
    initial:{ opacity: 0, translateX: 100},
    animate:{ opacity: 1,translateX: 0 },
    transition:{
        duration: 2,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
    }
}
const animationClose = {
    initial:{ opacity: 1, scale: 1},
    animate:{ opacity: 0, scale: 0.5,translateX:100},
    transition:{
        duration: 1,
        
        ease: [0, 0.71, 0.2, 1.01]
    }
}
  return reactDom.createPortal(
    <motion.div
        initial={onClose?animationClose.initial:animationOpen.initial}
        animate={onClose?animationClose.animate:animationOpen.animate}
        transition={onClose?animationClose.transition:animationOpen.transition}

     className='toast flex w-[20rem] bg-red-500 p-3 radius1'>   
      <div className='w-1/6 flex justify-center '><FaExclamation className='text-white text-2xl' /></div>
      <div className='w-5/6'>
        <p className='text-lg text-white'>
           {message}
           
        </p>
      </div>
    </motion.div>
  ,document.getElementById('mainToast')
  )
}
