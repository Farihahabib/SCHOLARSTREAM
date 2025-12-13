import React from 'react';
import MyLink from '../../Shared/MyLink';

const AdminManageDataRows = (scholarship) => {
    const {city,applicationFees,country,universityName} = scholarship.scholarship;
    console.log(scholarship);
    return (
       <tr className="border-b border-gray-200 hover:bg-gray-100 my-3 ">
        <td>{universityName}</td>
        <td>{country},{city}</td>
        <td>{applicationFees}</td>
        <td >
             {/* <MyLink to={`/updatescholarship/${_id}`}>  <button className="btn px-18 hover:text-white ">Update</button></MyLink>  */}
   <button className='btn hover'>Delete</button>

        </td>
       </tr>
    );
};

export default AdminManageDataRows;