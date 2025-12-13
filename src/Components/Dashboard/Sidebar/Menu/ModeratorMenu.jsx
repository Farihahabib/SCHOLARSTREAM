
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const ModeratorMenu = () => {
  return (
    <>
   
      <MenuItem icon={MdOutlineManageHistory} label='All reviews' address='all-reviews' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Applications'
        address='manage-applications'
      />
    </>
  )
}

export default ModeratorMenu