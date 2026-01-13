import MyLink from "./MyLink"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, GraduationCap } from "lucide-react"

const Footer = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className={`relative overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 border-gray-700' 
          : 'bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900 border-blue-800'
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full mr-4 ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">ScholarStream</h3>
            </div>
            <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
              Empowering students worldwide to achieve their academic dreams through accessible scholarship opportunities and comprehensive support.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className={`w-5 h-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-blue-100'}>support@scholarstream.com</span>
              </div>
              <div className="flex items-center">
                <Phone className={`w-5 h-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-blue-100'}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className={`w-5 h-5 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-blue-100'}>New York, NY 10001</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
            <nav className="space-y-3">
              <MyLink to='/' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                Home
              </MyLink>
              <MyLink to='/allscholarships' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                All Scholarships
              </MyLink>
              <MyLink to='/aboutus' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                About Us
              </MyLink>
              <MyLink to='/contactus' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                Contact
              </MyLink>
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-6">Legal & Support</h4>
            <nav className="space-y-3">
              <MyLink to='/terms-and-conditions' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                Terms & Conditions
              </MyLink>
              <MyLink to='/privacy-policy' className={`block transition-colors hover:text-blue-300 ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>
                Privacy Policy
              </MyLink>
              <button 
                onClick={(e) => e.preventDefault()} 
                className={`block text-left transition-colors hover:text-blue-300 cursor-default ${isDark ? 'text-gray-300' : 'text-blue-100'}`}
              >
                Success Stories
              </button>
              <button 
                onClick={(e) => e.preventDefault()} 
                className={`block text-left transition-colors hover:text-blue-300 cursor-default ${isDark ? 'text-gray-300' : 'text-blue-100'}`}
              >
                FAQ
              </button>
            </nav>
          </motion.div>
        </div>

        {/* Social Media & Stats */}
        <motion.div 
          className="border-t border-white/20 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Social Media */}
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <span className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-blue-100'}`}>Follow Us:</span>
              <div className="flex space-x-4">
                <motion.button 
                  onClick={(e) => e.preventDefault()}
                  className={`p-3 rounded-full transition-all duration-300 cursor-default ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button 
                  onClick={(e) => e.preventDefault()}
                  className={`p-3 rounded-full transition-all duration-300 cursor-default ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button 
                  onClick={(e) => e.preventDefault()}
                  className={`p-3 rounded-full transition-all duration-300 cursor-default ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button 
                  onClick={(e) => e.preventDefault()}
                  className={`p-3 rounded-full transition-all duration-300 cursor-default ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-200'}`}>1000+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Scholarships</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-200'}`}>5000+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Students Helped</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-200'}`}>$10M+</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-300'}`}>Awarded</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-white/20 pt-6 mt-8 text-center"
          variants={itemVariants}
        >
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-200'}`}>
            © {new Date().getFullYear()} ScholarStream. All rights reserved. | 
            <MyLink to='/privacy-policy' className="hover:text-blue-300 ml-1">Privacy Policy</MyLink> | 
            <MyLink to='/terms-and-conditions' className="hover:text-blue-300 ml-1">Terms & Conditions</MyLink>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer