import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {assets} from '../../assets/assets.js'

const AllApointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { CaluclateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Doctor</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 flex items-center space-x-2">
                  <img
                    src={item.userData.image}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{item.userData.name}</span>
                </td>
                <td className="py-2 px-4">{CaluclateAge(item.userData.dob)}</td>
                <td className="py-2 px-4">{slotDateFormate(item.slotDate)},{item.slotTime}</td>
                <td className="py-2 px-4 flex items-center space-x-2">
                 <img src={item.docData.image} className="w-10 h-10 rounded-full object-cover"/> 
                  <span>{item.docData.name}</span>
                </td>
                <td className="w-8 px-4">₹{item.amount}</td>
                <td className="py-2 px-4">
                 {item.cancelled
                 ? <p className="text-red-400 font-medium">Cancelled</p>
                : <img onClick={()=> cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="cancel" />
                 }
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllApointments;
