import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

//ListAccordian is a component which perform Accordian Property for list of data
// ListAccordianDetail is a subcomponent for ListAccordian which paas from parent to child to show details after onClick
// ListAccordianDetail takes data as parameter and show details of data it used is Used on [AllBikes] 

export default function ListAccordian({column,data,heading,ListAccordianDetail}){

    //accordianOpen is used to toggle the show and hide details of Accrodian 
    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <div className="p-2 radius1" >
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
       
       <div  className={`w-full grid grid-cols-${heading.length}  gap-4  text-sm md:text-base `} >

        {/* printing all value from heading array */}
          {heading?.map((head,id)=>{
            return(
              <div key={id} className="text-center  ">{head}</div>
            )
          })}
        

        </div>
        
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
         
         {/* drop down angle  */}
          <motion.div
            animate={
              accordionOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* After Clicking on Accordian show details of data ListAccordian will visible */}
        <div className="overflow-hidden">
        <ListAccordianDetail data={data}/>
          </div>
      </div>
    </div>
    )
}