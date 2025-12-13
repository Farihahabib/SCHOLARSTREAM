import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react"
import axios from "axios"

const FeedbackModal = ({ isOpen, closeModal, applicationId }) => {
  const [feedback, setFeedback] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(`/applications/feedback/${applicationId}`, {
      feedback,
    })

    setFeedback("")
    closeModal()
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6">
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Write Feedback
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <textarea
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full h-32 border rounded p-2 focus:outline-blue-500"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default FeedbackModal
