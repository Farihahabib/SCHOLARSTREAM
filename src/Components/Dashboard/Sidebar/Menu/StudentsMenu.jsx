import { BsFingerprint } from 'react-icons/bs'
import MenuItem from './MenuItem'
const StudentsMenu = () => {

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Applications' address='my-applications' />
      <MenuItem icon={BsFingerprint} label='My Reviews' address='my-reviews' />
    </>
  )
}

export default StudentsMenu