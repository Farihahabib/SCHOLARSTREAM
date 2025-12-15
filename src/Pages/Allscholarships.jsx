import React, { useState } from 'react';
import Container from '../Components/Shared/Container.jsx';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Card from '../Components/Home/Card.jsx';
import LoadingSpinner from '../components/Shared/LoadingSpinner.jsx';
import useAxiosSecure from '../Hooks/useAxiosSequire.jsx';

const Allscholarships = () => {
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
 const [sortBy, setSortBy] = useState('fees_asc');
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['scholarships', search, countryFilter, sortBy, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (countryFilter) params.append('country', countryFilter);
      if (sortBy) params.append('sortBy', sortBy);
      params.append('page', page);
      params.append('limit', limit);

      const res = await axios.get(`/allscholarships?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading scholarships.</p>;

  const { scholarships = [], total = 0, pages = 1 } = data || [];
  const uniqueCountries = [...new Set(scholarships.map(s => s.country))];

  return (
    <Container>
      <h2 className="text-center font-semibold text-blue-900 border-b-2 mx-auto w-30">All Scholarships</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 my-5">
        <input
          type="text"
          placeholder="Search by University Name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
        >
          <option value="">Filter by Country</option>
          {uniqueCountries.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
        </select>

      <select
  className="select select-bordered w-full md:w-1/4"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="fees_asc">Application Fees (Low → High)</option>
  <option value="fees_desc">Application Fees (High → Low)</option>
</select>

      </div>

      {/* Scholarships Grid */}
      {scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-9 mt-15">
          {scholarships.map(scholarship => <Card key={scholarship._id} scholarship={scholarship} />)}
        </div>
      ) : <p className="text-center text-gray-500 my-10">No Scholarships Found</p>}

      {/* Pagination */}
      <div className="flex justify-center gap-2 my-6">
        {[...Array(pages)].map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default Allscholarships;





























// import React from 'react';
// import Container from '../Components/Shared/Container.jsx';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import Card from '../Components/Home/Card.jsx';

// const Allscholarships = () => {
//    const {data: scholarships=[],isLoading,isError} =useQuery({
//       queryKey: ['scholarships'],
//       queryFn: async () =>{
// const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships` )
// return result.data
//       } 
//     })
//     return (
// <>
//       <Container>
//         <h2 className='text-center font-semibold text-blue-900 border-b-2 mx-auto w-30'>All Scholarship</h2>
//         <div className="search flex justify-between my-5">
//             <label className="input">
//   <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//     <g
//       strokeLinejoin="round"
//       strokeLinecap="round"
//       strokeWidth="2.5"
//       fill="none"
//       stroke="currentColor"
//     >
//       <circle cx="11" cy="11" r="8"></circle>
//       <path d="m21 21-4.3-4.3"></path>
//     </g>
//   </svg>
//   <input type="search" required placeholder="Search" />
// </label>
// <button className='border border-blue-900 rounded px-5 py-1 '>
//     <details className="dropdown">
//   <summary className="border-blue-600 m-1">Sort By Fees</summary>
//   <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
//     <li><a>High to low</a></li>
//     <li><a>Low to high</a></li>
//   </ul>
// </details>
// </button>
//         </div>
//         {
//       scholarships && scholarships.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  container mb-9 mt-15 mx-auto">
//           {scholarships.map((scholarship) => (
//             <Card key={scholarship._id} scholarship={scholarship} />
//           ))}
//  </div>) : null
//  }
//       </Container>

// </>
//     );
// };

// export default Allscholarships;