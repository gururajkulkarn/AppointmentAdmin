import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const {dtoken, setDtoken} = useContext(DoctorContext)
  const navigate = useNavigate();

  // const logout = () => {
  //   navigate('/');
  //   // Clear the token from local storage and context
  //   aToken && setAToken('');
  //  aToken && localStorage.removeItem('atoken');
  //   dtoken && setDtoken('');
  //  dtoken && localStorage.removeItem('dtoken');
   
  // }

  const logout = () => {
  if (aToken) {
    localStorage.removeItem('atoken');
    setAToken('');
  }

  if (dtoken) {
    localStorage.removeItem('dtoken');
    setDtoken('');
  }


  // After clearing tokens, redirect
  navigate('/');
};


  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <img
          src={assets.doc_meet}
          alt="Admin Logo"
          className="h-10 w-auto"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gay-500 text-gray-700 font-semibold">
          {aToken ? 'Admin' : 'Doctor'} Dashboard
        </p>
      </div>

      {/* Logout Button */}
      <button onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
