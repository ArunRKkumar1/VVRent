import React, { useEffect, useState } from 'react'
import bikeListJson from '../Data/bikes.json'
import { SearchBar } from './subComponent/SearchBar';
import { useNavigate } from 'react-router-dom';
export default function EditBikeModal() {
    const [bikeList, setBikeList] = useState([]);
    const [bike, setBike] = useState({});
    const navigate = useNavigate();
    //need to be change
    const fetchBikes = (input) => {
        const res = bikeListJson.filter((e) => {
            const { name, RC } = e;
            return name.toLowerCase().includes(input.toLowerCase()) || RC.includes(input.toUpperCase())
        })
        setBikeList(res);
    }
    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const confirmBike = () => {
        if(!bike || !bike.RC)
        return ;
    //RC will be replaced by id
        navigate(`/manage/bike/editBike/${bike.RC}`)
    }

  return (
        <div  className=' flex justify-center items-center  mt-4 m-auto pt-4 h-[100vh]  w-full  bg-slate-400'>
             <div className="p-4 bg-white text-black rounded-md container md:w-1/2 ">
            <div>
                <label className='text-xl'> Search Bike you want to edit</label>
            </div>
             <div className="search-input">
           
            <SearchBar picked={bike.name ? bike.name + " " + bike.RC : ""} setPick={setBike} fetch={fetchBikes} />
                        {bike.length === 0 && bikeList && bikeList.length > 0 && <div className="results-list ">
                            {bikeList?.map((result, id) => {
                                return <div key={id}
                                    className="search-result"
                                    onClick={(e) => { if (result.available) setBike(result) }}
                                >
                                    <div>
                                        {result.name}
                                    </div>
                                    <div className='flex gap-4'>
                                        <div>
                                            {result.RC}
                                        </div>
                                        <div className={`${result.available ? 'text-green-400' : 'text-red-500'}`}>

                                            {result.available ? 'Available' : 'Allotted'}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>}
            </div>
            <div>
                <button className='btn1 mt-4' type='button' onClick={confirmBike}>Confirm</button>
            </div>
            </div>
        </div>
    )
  
}
