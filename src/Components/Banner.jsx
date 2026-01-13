import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';

const Banner = () => {
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

  // Animation variants
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

  const leftContentVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const rightContentVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
    
    return (
        <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <section className={`relative text-white overflow-hidden transition-all duration-300 ${
              isDark 
                ? 'bg-linear-to-br from-gray-900 via-blue-900 to-gray-900' 
                : 'bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900'
            }`}>
              <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
                  <motion.div 
                    className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                   {/* Left Content */}
                   <motion.div 
                     className="left space-y-8"
                     variants={leftContentVariants}
                   >
                    <motion.div variants={titleVariants}>
                      <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                        ScholarStream
                      </h1>
                      <div className="h-1 w-24 bg-linear-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    </motion.div>
                    
                    <motion.p 
                      className={`text-xl md:text-2xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-blue-100'}`}
                      variants={subtitleVariants}
                    >
                      Unlock your academic potential with personalized scholarship opportunities from around the world.
                    </motion.p>

                    {/* Stats */}
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-4 gap-6"
                      variants={statsVariants}
                    >
                      <div className="text-center">
                        <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-200'}`}>1000+</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Scholarships</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-200'}`}>50+</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Countries</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-200'}`}>$10M+</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Awarded</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-200'}`}>5000+</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Students</div>
                      </div>
                    </motion.div>
                   </motion.div>

                   {/* Right Content */}
                   <motion.div 
                     className="right relative"
                     variants={rightContentVariants}
                   >
                    {/* Floating Elements */}
                    <motion.div 
                      className="absolute -top-4 -left-4 z-10"
                      variants={floatingVariants}
                      animate="animate"
                    >
                      <div className={`p-3 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} shadow-lg`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="absolute -top-2 -right-6 z-10"
                      variants={floatingVariants}
                      animate="animate"
                      style={{ animationDelay: '1s' }}
                    >
                      <div className={`p-3 rounded-full ${isDark ? 'bg-purple-600' : 'bg-purple-500'} shadow-lg`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="absolute -bottom-4 -left-2 z-10"
                      variants={floatingVariants}
                      animate="animate"
                      style={{ animationDelay: '2s' }}
                    >
                      <div className={`p-3 rounded-full ${isDark ? 'bg-green-600' : 'bg-green-500'} shadow-lg`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Main Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        className={`p-8 rounded-2xl shadow-2xl border backdrop-blur-sm transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/80' 
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                        }`}
                        variants={cardVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          rotate: 2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className={`p-4 rounded-full w-fit mb-4 ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-200'}`}>Global Scholarships</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>Access scholarships from top universities worldwide</p>
                      </motion.div>

                      <motion.div 
                        className={`p-8 rounded-2xl shadow-2xl border backdrop-blur-sm transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/80' 
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                        }`}
                        variants={cardVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          rotate: -2,
                          transition: { duration: 0.2 }
                        }}
                        style={{ marginTop: '2rem' }}
                      >
                        <div className={`p-4 rounded-full w-fit mb-4 ${isDark ? 'bg-purple-600' : 'bg-purple-500'}`}>
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-200'}`}>Merit Awards</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>Recognition for academic excellence and achievements</p>
                      </motion.div>
                    </div>
                   </motion.div>
                  </motion.div>
              </div>
            </section>
        </div>
    );
};

export default Banner;