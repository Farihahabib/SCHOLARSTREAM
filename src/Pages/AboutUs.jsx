import React from "react";

const AboutUs = () => {
  return (
    <section className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-900">
          About ScholarStream
        </h2>
        <p className="mt-4 text-center text-lg text-gray-700 max-w-2xl mx-auto">
          Empowering students worldwide by simplifying scholarship discovery.
        </p>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left content */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Our Mission
            </h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              At ScholarStream, our mission is to connect students with global 
              scholarship, grant, and funding opportunities—quickly and easily. 
              We believe financial barriers should never prevent someone from 
              pursuing education and achieving their dreams.
            </p>

            <h3 className="text-2xl font-semibold text-blue-800 mt-8">
              What We Provide
            </h3>
            <ul className="mt-3 list-disc list-inside text-gray-700 space-y-2">
              <li>Verified scholarships from trusted organizations worldwide</li>
              <li>Easy search and filter system to find relevant programs</li>
              <li>Detailed information on eligibility, benefits, and deadlines</li>
              <li>Guidance and tips for application success</li>
              <li>A community that supports educational growth</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-800 mt-8">
              Our Vision
            </h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              We envision a world where every student—regardless of background—
              can access the education they deserve. ScholarStream aims to be 
              the leading global platform for scholarship discovery and academic 
              opportunity.
            </p>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/28fJzzP/scholarship-illustration.png"
              alt="About ScholarStream"
              className="w-full max-w-md drop-shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
