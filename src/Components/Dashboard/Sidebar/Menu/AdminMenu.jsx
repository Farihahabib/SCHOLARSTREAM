import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsFillHouseAddFill } from 'react-icons/bs'
const AdminMenu = () => {
  return (
    <>
       <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Scholarship'
        address='add-scholarship'
      />
       <MenuItem
        icon={BsFillHouseAddFill}
        label='Manage Scholarship'
        address='manage-scholarship'
      />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Analytics' address='analytics' />
    </>
  )
}

export default AdminMenu