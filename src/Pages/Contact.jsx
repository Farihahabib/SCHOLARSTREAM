import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users } from "lucide-react";

const ContactUs = () => {
  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold ${
              isDark ? 'text-blue-400' : 'text-blue-900'
            }`}
          >
            Contact Us
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-24 bg-linear-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"
          />
          <motion.p 
            variants={itemVariants}
            className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Have questions, feedback, or need support? We're here to help you achieve your academic dreams.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: <Mail className="w-8 h-8" />,
              title: "Email Us",
              info: "support@scholarstream.com",
              description: "Get in touch via email for detailed inquiries"
            },
            {
              icon: <Phone className="w-8 h-8" />,
              title: "Call Us",
              info: "+1 (555) 123-4567",
              description: "Speak directly with our support team"
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Visit Us",
              info: "New York, NY 10001",
              description: "123 Learning Avenue, Education City"
            }
          ].map((contact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-8 rounded-2xl border text-center transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-gray-50 border-gray-200 hover:shadow-lg'
              }`}
            >
              <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <div className="text-white">
                  {contact.icon}
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {contact.title}
              </h3>
              <p className={`text-lg font-medium mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {contact.info}
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {contact.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >

          {/* Left side - info */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            <div className={`p-8 rounded-2xl border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full mr-4 ${
                  isDark ? 'bg-green-600' : 'bg-green-500'
                }`}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-green-400' : 'text-green-700'
                }`}>
                  Get in Touch
                </h3>
              </div>
              <p className={`leading-relaxed mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Our dedicated team is available to assist you with scholarship inquiries,
                application guidance, website issues, or any general questions. We're committed
                to helping you succeed in your educational journey.
              </p>

              {/* Support Hours */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className={`w-5 h-5 mr-3 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Support Hours
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className={`w-5 h-5 mr-3 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Response Time
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className={`p-6 rounded-xl border ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-800'
              }`}>
                Quick Help
              </h4>
              <div className="space-y-2">
                <a href="#" className={`block text-sm hover:underline ${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  • How to apply for scholarships
                </a>
                <a href="#" className={`block text-sm hover:underline ${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  • Eligibility requirements
                </a>
                <a href="#" className={`block text-sm hover:underline ${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  • Application status tracking
                </a>
                <a href="#" className={`block text-sm hover:underline ${
                  isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  • Payment and fees
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - form */}
          <motion.div variants={itemVariants}>
            <div className={`p-8 rounded-2xl border shadow-lg ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full mr-4 ${
                  isDark ? 'bg-purple-600' : 'bg-purple-500'
                }`}>
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Send us a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                    }`}
                  />
                </div>

                <motion.button
                  type="submit"
                  className={`w-full font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;