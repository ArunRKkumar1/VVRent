import React from "react";

export default React.forwardRef(({ className,defaultValue,options , ...props}, ref) => {

    return (
        <>
            <select  id="underline_select" className={`block py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer ${className}`} {...props} ref={ref} >
                {defaultValue && <option className="text-gray-500" value={defaultValue}>{defaultValue}</option>}
                {options?.map((option, index) => {
                    return (
                        <option className="text-gray-500" key={index} value={option}>{option}</option>
                    )
                })}
                
            </select>
        </>
    )
})