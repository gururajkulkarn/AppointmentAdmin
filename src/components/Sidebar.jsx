import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>

{aToken && <ul className='text-[#515151] mt-5'>
  
  <NavLink to={'/admin-dashboard'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 ' : ''}  `}>
    <img src={assets.home_icon} alt="Dashboard" />
    <p>Dashboard</p>
  </NavLink>
    <NavLink to={'/all-appointments'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 ' : ''}  `}>
    <img src={assets.appointment_icon} alt="Appointments" />
    <p>Appointments</p>
  </NavLink>
    <NavLink to={'/add-doctors'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 ' : ''}  `}>
    <img src={assets.add_icon} alt="AddDoctor" />
    <p>AddDoctor</p>
  </NavLink>
    <NavLink to={'/doctor-list'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-600 ' : ''}  `}>
    <img src={assets.people_icon} alt="Doctors List" />
    <p>Doctors List</p>
  </NavLink>
  
  </ul>}




    </div>
  )
}

export default Sidebar