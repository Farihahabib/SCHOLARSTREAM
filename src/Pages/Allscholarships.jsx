import React, { useState, useEffect } from 'react';
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
  const [isDark, setIsDark] = useState(false);
  const limit = 8;

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['scholarships', search, countryFilter, sortBy, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (countryFilter) params.append('country', countryFilter);
      if (sortBy) params.append('sortBy', sortBy);
      params.append('page', page);
      params.append('limit', limit);

      const res = await axios.get(`https://backend-zeta-eight-65.vercel.app/allscholarships?${params.toString()}`);
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
      <h2 className={`text-center font-semibold border-b-2 mx-auto w-30 text-2xl py-4 mb-6 ${
        isDark ? 'text-blue-400 border-blue-400' : 'text-blue-900 border-blue-900'
      }`}>All Scholarships</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 my-5">
        <input
          type="text"
          placeholder="Search by University Name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDark 
              ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
          }`}
        />

        <select
          className={`w-full md:w-1/4 px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDark 
              ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
              : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-300 focus:border-blue-300'
          }`}
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
        >
          <option value="">Filter by Country</option>
          {uniqueCountries.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
        </select>

        <select
          className={`w-full md:w-1/4 px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDark 
              ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
              : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-300 focus:border-blue-300'
          }`}
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
      ) : <p className={`text-center my-10 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No Scholarships Found</p>}

      {/* Pagination */}
      <div className="flex justify-center gap-2 my-6">
        {[...Array(pages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              page === idx + 1 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                : isDark 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
            }`}
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