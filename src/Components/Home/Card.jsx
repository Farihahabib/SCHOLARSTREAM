import { Link } from 'react-router'
import MyLink from '../Shared/MyLink'

const Card = ({scholarship}) => {
const { _id, applicationFees,city,country,image,scholarshipCategory,universityName,} = scholarship || {};
console.log(scholarship)
  return (
 <div className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-xl mx-auto ">
      
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

      <div className="p-4 space-y-3 flex flex-col flex-1 justify-between
">

        {/* University Name */}
        <h3 className="text-lg font-bold text-gray-800">
          {universityName}
        </h3>

        {/* Category */}
        <p className="text-sm font-medium text-blue-600">
          {scholarshipCategory}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-600">
          📍 {country},{city}
        </p>

        {/* Application Fee */}
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Application Fee:</span>{" "}
          {applicationFees ? `${applicationFees}` : "Free"}
        </p>
          {/* View Details Button */}
       <MyLink to={`/scholarships/${_id}`}>
          <button className="mt-2 w-full btn text-white py-2 rounded-lg hover transition">
            View Details
          </button>
        </MyLink>

      </div>
    
    </div>
  )
}

export default Card