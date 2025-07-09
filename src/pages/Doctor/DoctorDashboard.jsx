import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {


  const {dtoken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment} = useContext(DoctorContext)

  const {slotDateFormate} = useContext(AppContext)

  useEffect(()=>{
    if(dtoken){
      getDashData();
    }

  },[dtoken])

  return dashData && (
    <div className="m-6 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
                <img src={assets.earning_icon} alt="Doctors" className="w-14 h-14" />
                <div>
                  <p className="text-2xl font-bold">₹{dashData.earnings}</p>
                  <p className="text-gray-500">Earning</p>
                </div>
              </div>
    
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
                <img
                  src={assets.appointments_icon}
                  alt="Appointments"
                  className="w-14 h-14"
                />
                <div>
                  <p className="text-2xl font-bold">{dashData.appointments}</p>
                  <p className="text-gray-500">Appointments</p>
                </div>
              </div>
    
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
                <img
                  src={assets.patients_icon}
                  alt="Patients"
                  className="w-14 h-14"
                />
                <div>
                  <p className="text-2xl font-bold">{dashData.patients}</p>
                  <p className="text-gray-500">Patients</p>
                </div>
              </div>
            </div>
    
            {/* Latest Bookings */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={assets.list_icon} alt="List" className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-700">
                  Latest Bookings
                </h2>
              </div>
    
              <div className="space-y-4">
                {dashData.latestAppointments.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {item.userData.name}
                        </p>
                        <p className="text-sm text-gray-500">{slotDateFormate(item.slotDate)}</p>
                      </div>
                    </div>
                    <div>
                       {item.cancelled ? (
                                      <p className="text-red-600 text-xs font-medium">Cancelled</p>
                                    ) : item.isCompleted ? (
                                      <p className="text-green-600 text-xs font-medium">Completed</p>
                                    ) : (
                                      <div className="flex gap-2 items-center">
                                        <img
                                          src={assets.cancel_icon}
                                          alt="Cancel"
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() => cancelAppointment(item._id)}
                                        />
                                        <img
                                          src={assets.tick_icon}
                                          alt="Complete"
                                          className="w-5 h-5 cursor-pointer"
                                          onClick={() => completeAppointment(item._id)}
                                        />
                                      </div>
                                    )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  )
}

export default DoctorDashboard