import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

// Search bar is a Auto Seacrh input to search and select 
//The 'fetch' function is a method belonging to the parent class, designed to filter data based on the provided input.
export const SearchBar = ({picked, setPick ,fetch }) => {
  
  const [input, setInput] = useState("");

  useEffect(()=>{
    setInput(picked)
  },[picked])

  const handleChange = async (value) => {
    setInput(value.target.value);
    fetch(value.target.value)
  };

  // return an input element with a search icon provide filter functionality on change 
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input 
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e)}
        onClick={()=>{
        setPick('');
      }}
      />
    </div>
  );
};
