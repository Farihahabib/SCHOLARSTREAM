import React from 'react';
import Container from '../Components/Shared/Container.jsx';

const Allscholarships = () => {
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
      </Container>

</>
    );
};

export default Allscholarships;