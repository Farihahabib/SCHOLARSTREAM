import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const FeedbackModal = ({ isOpen, closeModal, applicationId }) => {
  const [feedback, setFeedback] = useState("")
  const [isDark, setIsDark] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post(`/applications/feedback/${applicationId}`, {
        feedback,
      })

      toast.success("Feedback submitted successfully!")
      setFeedback("")
      closeModal()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className={`w-full max-w-md rounded-xl shadow-2xl p-6 transform transition-all ${
          isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}>
          <DialogTitle className={`text-2xl font-bold text-center mb-6 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Write Feedback
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block mb-2 font-medium text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Your Feedback
              </label>
              <textarea
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback for this application..."
                rows="5"
                className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 resize-none ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? 'cursor-wait' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default FeedbackModal
