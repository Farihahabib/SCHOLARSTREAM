import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Target, Eye, Users, Award, BookOpen } from "lucide-react";

const AboutUs = () => {
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
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        
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
            About ScholarStream
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"
          />
          <motion.p 
            variants={itemVariants}
            className={`mt-6 text-lg md:text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Empowering students worldwide by simplifying scholarship discovery and making education accessible to all.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >

          {/* Left content */}
          <motion.div variants={itemVariants} className="space-y-8">
            
            {/* Mission */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-lg'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full mr-4 ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-blue-400' : 'text-blue-800'
                }`}>
                  Our Mission
                </h3>
              </div>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                At ScholarStream, our mission is to connect students with global 
                scholarship, grant, and funding opportunities—quickly and easily. 
                We believe financial barriers should never prevent someone from 
                pursuing education and achieving their dreams.
              </p>
            </div>

            {/* Vision */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-lg'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full mr-4 ${
                  isDark ? 'bg-purple-600' : 'bg-purple-500'
                }`}>
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-purple-400' : 'text-purple-800'
                }`}>
                  Our Vision
                </h3>
              </div>
              <p className={`leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                We envision a world where every student—regardless of background—
                can access the education they deserve. ScholarStream aims to be 
                the leading global platform for scholarship discovery and academic 
                opportunity.
              </p>
            </div>
          </motion.div>

          {/* Right content - Illustration */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className={`relative p-8 rounded-2xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-2xl`}>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4">
                <div className={`p-3 rounded-full ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                } shadow-lg`}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute -top-2 -right-6">
                <div className={`p-3 rounded-full ${
                  isDark ? 'bg-purple-600' : 'bg-purple-500'
                } shadow-lg`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-2">
                <div className={`p-3 rounded-full ${
                  isDark ? 'bg-green-600' : 'bg-green-500'
                } shadow-lg`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Main illustration */}
              <div className={`w-80 h-80 rounded-xl flex items-center justify-center ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900 to-purple-900' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <div className="text-center">
                  <GraduationCap className={`w-24 h-24 mx-auto mb-4 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <h4 className={`text-2xl font-bold ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Education for All
                  </h4>
                  <p className={`mt-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Breaking barriers, building futures
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What We Provide */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 
            variants={itemVariants}
            className={`text-3xl font-semibold text-center mb-12 ${
              isDark ? 'text-blue-400' : 'text-blue-800'
            }`}
          >
            What We Provide
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Verified Scholarships",
                description: "Trusted organizations worldwide with verified opportunities"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Easy Search System",
                description: "Advanced filters to find programs that match your profile"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Detailed Information",
                description: "Complete eligibility, benefits, and deadline information"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Application Guidance",
                description: "Tips and strategies for successful scholarship applications"
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Global Community",
                description: "Connect with students and mentors worldwide"
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Success Tracking",
                description: "Monitor your applications and celebrate achievements"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl border text-center transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`p-4 rounded-full w-fit mx-auto mb-4 ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {item.title}
                </h4>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={`p-8 rounded-2xl text-center ${
            isDark 
              ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-white mb-8"
          >
            Our Impact
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Scholarships" },
              { number: "50+", label: "Countries" },
              { number: "$10M+", label: "Awarded" },
              { number: "5000+", label: "Students Helped" }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
