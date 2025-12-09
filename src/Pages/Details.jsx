import React from 'react';
import Container from '../Components/Shared/Container';
import MyLink from '../Components/Shared/MyLink';
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
    return (
        <Container>
        <div>
            <div className="max-w-5xl mx-auto px-6 py-12">
      {/* University Image */}
      <div className="w-full h-64 bg-gray-300 rounded-xl overflow-hidden shadow-md">
        <img
          src='data.universityImage'
          alt="University"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Info */}
      <div className="mt-8 bg-white shadow-xl rounded-xl p-9">
        <h1 className="text-3xl font-bold text-blue-900">
          scholarshipName
        </h1>

        <p className="text-gray-700 mt-2 text-lg">
          <strong>University World Rank:</strong> data.worldRank
        </p>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <DetailBox label="Deadline" value='data.deadline' />
          <DetailBox label="Location" value='data.location' />
          <DetailBox label="Application Fees" value='data.applicationFees' />
          <DetailBox
            label="Stipend / Coverage"
            value=
            // 'data.stipend' ||
             "Not Provided"
            pre
          />
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            Scholarship Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            'data.description'
          </p>
        </div>

        {/* Apply Button */}
        <div className="mt-8">
          <MyLink to='/payment' className="btn hover text-white px-8 py-2 rounded-lg font-semibold transition hover:bg-blue-800">
            Apply Now
          </MyLink >
        </div>
      </div>
    </div>

</div>


  </Container>
    );
};

export default Details;