import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"

const DetailsModal = ({ isOpen, closeModal, data }) => {
    console.log(data);
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
   
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6">
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Application Details
          </DialogTitle>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Applicants Email:</strong> {data?.studentEmail}</p>
            <p><strong>UniversityName:</strong> {data?.universityName}</p>
            <p><strong>ScholarshipName:</strong> {data?.scholarshipName}</p>
            <p><strong>subjectCategory:</strong> {data?.subjectCategory}</p>
            <p><strong>Place:</strong> {data?.country}</p>
            <p><strong>Degree:</strong> {data?.degree}</p>
            <p><strong>tranjectionId:</strong> {data?.tranjectionId}</p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded"
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
