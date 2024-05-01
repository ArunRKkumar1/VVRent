import React from 'react'

export default React.forwardRef(({message, ...props}, ref) => {
    return (
        <h5 className='text-sm text-red-500' {...props} ref={ref}>
            {message}
        </h5>
    )
})