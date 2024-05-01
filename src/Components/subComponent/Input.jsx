//custom input componenet 
import React, { useId } from 'react';

export default React.forwardRef(function({label,className,labelClass,inputClass,...props},ref){
    const id = useId();
    return (
        <div className={className} >
            {label && <label htmlFor={id} className={labelClass}>{label}</label>}
            <input className={`${inputClass} disabled:text-white`}  id={id} {...props}  ref={ref}/>
        </div>
    )
})