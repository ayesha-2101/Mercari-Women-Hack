import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt4, HiOutlineX } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import logo from '../../assets/logo.png';
import { auth } from '../../config/firebase'; // Import Firebase auth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to track user
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false); // Close mobile menu if clicked outside
        setIsDropdownOpen(false); // Close dropdown when mobile menu closes
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if the user is logged in using Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        console.log('Logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <nav className="bg-white bg-opacity-20 backdrop-blur-lg shadow-md w-full sticky top-0 left-0 z-50">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center py-4 px-4 lg:px-6">
        <div className="flex items-center">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/93/Mercari_logo.svg"
    alt="Mercari Logo"
    className="w-28 h-30"
  />
</div>

        <ul className="hidden md:flex space-x-6 lg:space-x-8 text-lg lg:text-[16px] font-semibold">
          {/* Navigation links */}
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-red-500 transition-colors duration-300'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-red-500 transition-colors duration-300'}>
              My Communities
            </NavLink>
          </li>
          <li>
            <NavLink to="/program" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-red-500 transition-colors duration-300'}>
              Style Assistant
            </NavLink>
            
          </li>
          <li>
            <NavLink to="/season" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-red-500 transition-colors duration-300'}>
              Seasonal Analysis
            </NavLink>
          </li>

          {/* Dropdown for Resources */}
         

          
            

          {/* Conditional Logout Button */}
          {user && (
            <li>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition-colors duration-300">
                Logout
              </button>
            </li>
          )}
        </ul>

       

        {/* Hamburger Menu for small screens */}
        <div className="flex items-center md:hidden">
          {isOpen ? <HiOutlineX className="text-3xl cursor-pointer" onClick={toggleMenu} /> : <HiOutlineMenuAlt4 className="text-3xl cursor-pointer" onClick={toggleMenu} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div ref={mobileMenuRef} className={`${isOpen ? 'block' : 'hidden'} bg-white shadow-md fixed top-16 left-0 w-full z-50 mt-10`} initial={{ opacity: 0, y: -50 }} animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }} transition={{ duration: 0.5 }}>
        <ul className="flex flex-col space-y-4 text-center text-lg font-semibold py-4">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? '' : 'text-red-600 hover:text-green-600 transition-colors duration-300'} onClick={() => { toggleMenu(); setIsDropdownOpen(false); }}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-green-600 transition-colors duration-300'} onClick={() => { toggleMenu(); setIsDropdownOpen(false); }}>
              COMMUNITY
            </NavLink>
          </li>
          <li>
            <NavLink to="/program" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-green-600 transition-colors duration-300'} onClick={() => { toggleMenu(); setIsDropdownOpen(false); }}>
              CHATS
            </NavLink>
          </li>

          

          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-red-600' : 'text-gray-800 hover:text-green-600 transition-colors duration-300'} onClick={() => { toggleMenu(); setIsDropdownOpen(false); }}>
              SEASONAL ANALYSIS
            </NavLink>
          </li>
          
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
