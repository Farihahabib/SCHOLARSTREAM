import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const StudentsMenu = () => {
  // const [isOpen, setIsOpen] = useState(false)

  // const closeModal = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Applications' address='my-applications' />
      <MenuItem icon={BsFingerprint} label='My Reviews' address='my-reviews' />
    </>
  )
}

export default StudentsMenu