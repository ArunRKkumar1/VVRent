import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
export default function Loader() {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
          document.body.style.overflowY = "scroll";
        };
      }, []);
  return ReactDOM.createPortal(
    <div className='loader'>
      
    </div>,
    document.getElementById('mainLoader')
  )
}
