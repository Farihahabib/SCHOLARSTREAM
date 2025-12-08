import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to,className, children}) => {
    return (
        <NavLink 
        to={to}
         className={({ isActive })=>
            isActive ?"text-blue-950  border-b-3 font-bold" : `${className} font-semibold text-blue-950`} >
            {children}
            </NavLink>
    );
};
export default MyLink;