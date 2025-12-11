import React from 'react';
import Container from '../Components/Shared/Container.jsx';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '../Components/Home/Card.jsx';

const Allscholarships = () => {
   const {data: scholarships=[],isLoading,isError} =useQuery({
      queryKey: ['scholarships'],
      queryFn: async () =>{
const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships` )
return result.data
      } 
    })
    return (
<>
      <Container>
        <h2 className='text-center font-semibold text-blue-900 border-b-2 mx-auto w-30'>All Scholarship</h2>
        <div className="search flex justify-between my-5">
            <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search" />
</label>
<button className='border border-blue-900 rounded px-5 py-1 '>
    <details className="dropdown">
  <summary className="border-blue-600 m-1">Sort By Fees</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>High to low</a></li>
    <li><a>Low to high</a></li>
  </ul>
</details>
</button>
        </div>
        {
      scholarships && scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9 mt-15 mx-auto">
          {scholarships.map((scholarship) => (
            <Card key={scholarship._id} scholarship={scholarship} />
          ))}
 </div>) : null
 }
      </Container>

</>
    );
};

export default Allscholarships;