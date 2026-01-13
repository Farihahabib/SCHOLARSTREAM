import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to, className, children}) => {
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
        <NavLink 
            to={to}
            className={({ isActive }) =>
                isActive 
                    ? `${isDark ? 'text-blue-400' : 'text-blue-600'} border-b-2 border-current font-bold px-3 py-2` 
                    : `${className || (isDark ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600')} font-semibold px-3 py-2 transition-colors duration-200`
            }
        >
            {children}
        </NavLink>
    );
};

export default MyLink;