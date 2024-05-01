import React from 'react'

export default function Navbar({darkMode,setDarkMode}) {
  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode)
    setDarkMode(!darkMode)
  }
  return (
    <div className='shadow-main z-10 w-full  top-0  flex justify-between px-6 py-2 items-center   bg-white dark:bg-black dark:text-white dark:shadow-sm dark:shadow-slate-50 '>
      <div>
        <h1 className='text-lg md:text-3xl font-semibold '>Admin Panel</h1>
      </div>
      <div className='flex items-center gap-4'>
          <div className='dark-btn-toggle '>
            <input type="checkbox" id="dark-mode" checked={darkMode} onChange={toggleDarkMode} />
            <label htmlFor="dark-mode"></label>
          </div>
       
        <div>
          <h1 className=' text-lg md:text-3xl font-semibold '>Login</h1>
        </div>

      </div>
    </div>
  )
}
