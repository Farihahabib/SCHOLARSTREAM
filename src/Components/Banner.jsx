import React from 'react';

const Banner = ({onSearch}) => {
      const [query, setQuery] = React.useState("");

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) onSearch(query.trim());
    // else console.log("Search query:", query.trim());
  };
    
    return (
        <div>
            <section className="bg-linear-to-r from-blue-800 to-indigo-900 text-white">
              <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32">
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center '>
                   <div className="left">
                    <h1 className='text-3xl font-bold'>ScholarStream</h1>
                    <p className=''>Find scholarships, grants, and funding opportunities tailored for you.</p>
                    <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl"
              role="search"
            >
              <label htmlFor="scholar-search" className="sr-only">
                Search scholarships
              </label>
              <input
                id="scholar-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='search scholarships'
                className="w-full sm:flex-1 rounded-md px-4 py-2 text-white placeholder-white focus:outline-white focus:ring-2 focus:ring-blue-50 bg-blue-300"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center  gap-2 rounded-md bg-indigo-400 text-white font-semibold px-5  transition btn hover"
              >
                search
              </button>
            </form>





       
                   </div>
                   <div className="right flex gap-8 bg-blue-50 text-blue-700 justify-center items-center py-8 rounded-2xl">
                    <div className="1 bg-blue-200 p-4 rounded-xl">
                        <p className="small font-md">Scholarship</p>
                        <p className="small font-bold">Global Research  Grant</p>
                    </div>
                    <div className="2  bg-blue-200 p-4 rounded-xl">
                         <p className="small font-md">Fellowship</p>
                        <p className="small font-bold">Innovation Fellowship</p>
       
                    </div>
                   </div>
                  </div>
              </div>
            </section>
        </div>
    );
};

export default Banner;