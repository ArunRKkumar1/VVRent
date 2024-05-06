
import { motion } from "framer-motion";
import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import ReactDOM from 'react-dom'

export default function App({execute,message , show}) {
    // Function to handle right-click event
  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent the default right-click action
    alert("Right-clicking is blocked.");
  };

  // Attach the right-click event handler to the entire document
  useEffect(() => {
    document.addEventListener('contextmenu', handleRightClick);
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
          document.body.style.overflowY = "scroll";
        };
      }, []);
    const toggleConfirm = () => {
        
        execute();
        if(show)
        show(false);
    }
    return ReactDOM.createPortal(
        <div className="modal">
            <motion.div
            className="modal-content aspect-video flex flex-col"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}  
            >
                <div className="flex justify-end" onClick={()=>show(false)} >
                <IoClose className="text-4xl translate-x-3 translate-y-1 hover:text-red-500 transition-colors duration-300 text-white cursor-pointer" />
                </div>
                <div className="bg-white shadow-2xl radius1 mx-4 flex flex-col p-3 gap-4 h-full justify-between">
                    <div>
                        <p className="text-xl  md:text-3xl">
                            {message}
                            </p>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn1" on onClick={toggleConfirm}>Confirm</button>
                    </div>
                </div>
            </motion.div >
        </div>
        , document.getElementById('mainModals'));
}
