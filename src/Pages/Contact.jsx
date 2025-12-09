import React from "react";

const ContactUs = () => {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-blue-900">
          Contact Us
        </h2>
        <p className="mt-4 text-center text-gray-700 max-w-xl mx-auto">
          Have questions, feedback, or need support? We’re here to help you.
        </p>

        {/* Content */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left side - info */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-800">
              Get in Touch
            </h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Our team is available to assist you with scholarship inquiries,
              website issues, or general questions. Feel free to reach out anytime.
            </p>

            <div className="mt-6 space-y-4">
              <p>
                <span className="font-semibold text-blue-900">Email:</span>{" "}
                support@scholarstream.com
              </p>
              <p>
                <span className="font-semibold text-blue-900">Phone:</span>{" "}
                +1 (555) 123-4567
              </p>
              <p>
                <span className="font-semibold text-blue-900">Address:</span>{" "}
                123 Learning Avenue, Education City, Global
              </p>
            </div>
          </div>

          {/* Right side - form */}
          <div>
            <form className="bg-gray-50 p-8 rounded-xl shadow-md space-y-6">

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900  text-white font-semibold py-3 rounded-md transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;

   