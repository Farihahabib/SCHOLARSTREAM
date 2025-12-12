import React from 'react';
import Container from '../Components/Shared/Container';
import MyLink from '../Components/Shared/MyLink';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
const DetailBox = ({ label, value, pre }) => (
  <div className="p-4 bg-blue-50 rounded-lg border">
    <p className="font-semibold text-blue-900">{label}</p>

    {pre ? (
      <pre className="text-gray-800 whitespace-pre-wrap">{value}</pre>
    ) : (
      <p className="text-gray-800">{value}</p>
    )}
  </div>
);

const Details = () => {
  const {id}=useParams();
  const {data:scholarship=[],isLoading,isError,refetch} =useQuery({
      queryKey: ['scholarship',id],
      queryFn: async () =>{
const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships/${id}` )
return result.data
      }
  })
console.log(scholarship)
      if(isLoading) return <LoadingSpinner />
    const {scholarshipName,image,applicationFees,city,country,deadline,degree,postDate,scholarshipCategory,serviceCharge,subjectCategory,tuitionFees,universityName,userEmail,worldRank,_id}  = scholarship || {};
    return (
        <Container>
        <div>
            <div className="max-w-5xl mx-auto px-6 py-12">
      {/* University Image */}
      <div className="w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-md">
        <img
          src={image}
          alt="University"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Info */}
      <div className="mt-8 bg-white shadow-xl rounded-xl p-9">
        <h1 className="text-3xl font-bold text-blue-900">
          {scholarshipName}
        </h1>

        <p className="text-gray-700 mt-2 text-lg">
          <strong>University World Rank:</strong> {worldRank}
        </p>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <DetailBox label="Deadline" value={deadline} />
          <DetailBox label="Location" value={`${city},${country}`}/>
          <DetailBox label="Application Fees" value={applicationFees} />
          <DetailBox
            label="Stipend / Coverage"
            value=
         {scholarship.stipend || "Not Provided"}
            pre
          />
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
           
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {scholarship.description || "No description provided."}
          </p>
        </div>

        {/* Apply Button */}
        <div className="mt-8">
          <MyLink to={`/payment/${id}`} scholarship={scholarship} id={id} className="btn hover text-white px-8 py-2 rounded-lg font-semibold transition hover:bg-blue-800">
            Apply For Scholarship
          </MyLink >
        </div>
      </div>
    </div>

</div>


  </Container>
    );
};

export default Details;