import { Link } from 'react-router'
import MyLink from '../Shared/MyLink'
import { useState, useEffect } from 'react'

const Card = ({scholarship}) => {
const { _id, applicationFees,city,country,image,scholarshipCategory,universityName,} = scholarship || {};
const [isDark, setIsDark] = useState(false)

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

console.log(scholarship)
  return (
 <div className={`shadow-xl rounded-xl overflow-hidden hover:shadow-xl mx-auto border transition-all duration-300 ${isDark ? 'card-dark hover:shadow-gray-700' : 'card-light'}`}>
      
      {/* University Image */}
       <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
              rounded-b-none
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
               hover:scale-110
                transition
              '
            src={image}
            alt={universityName}
          />
   
        </div>

      <div className="p-4 space-y-3 flex flex-col flex-1 justify-between">

        {/* University Name */}
        <h3 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {universityName}
        </h3>

        {/* Category */}
        <p className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {scholarshipCategory}
        </p>

        {/* Location */}
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          📍 {country},{city}
        </p>

        {/* Application Fee */}
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="font-semibold">Application Fee:</span>{" "}
          {applicationFees ? `$${applicationFees}` : "Free"}
        </p>
          {/* View Details Button */}
       <MyLink to={`/scholarships/${_id}`}>
          <button className={`mt-2 w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isDark 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
          }`}>
            View Details
          </button>
        </MyLink>

      </div>
    
    </div>
  )
}

export default Card