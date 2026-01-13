import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState, useEffect } from "react"

const DetailsModal = ({ isOpen, closeModal, data }) => {
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

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className={`w-full max-w-lg rounded-xl shadow-2xl p-6 transform transition-all ${
          isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}>
          <DialogTitle className={`text-2xl font-bold text-center mb-6 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Application Details
          </DialogTitle>

          <div className="space-y-4">
            {/* Student Information */}
            <div className={`p-4 rounded-lg border ${
              isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm font-medium mb-1 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Student Information
              </p>
              <p className="font-semibold">{data?.studentName || 'N/A'}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {data?.studentEmail}
              </p>
            </div>

            {/* University Information */}
            <div className={`p-4 rounded-lg border ${
              isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-200'
            }`}>
              <p className={`text-sm font-medium mb-1 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                University & Scholarship
              </p>
              <p className="font-semibold">{data?.universityName}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {data?.scholarshipName}
              </p>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  Subject Category
                </p>
                <p className="font-semibold">{data?.subjectCategory}</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  Degree Level
                </p>
                <p className="font-semibold">{data?.degree}</p>
              </div>
            </div>

            {/* Location & Transaction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-indigo-50 border-indigo-200'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  Location
                </p>
                <p className="font-semibold">{data?.country}</p>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-pink-50 border-pink-200'
              }`}>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-pink-400' : 'text-pink-600'
                }`}>
                  Transaction ID
                </p>
                <p className="font-mono text-sm break-all">{data?.tranjectionId}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={closeModal}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DetailsModal
