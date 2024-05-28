import React from 'react'

export default function({message}) {
    return (
        <div className='text-start form-error '>
        <p className='text-sm font-bold '>
            {message}*
        </p>
        </div>
    )
}