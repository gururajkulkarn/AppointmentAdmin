import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  
  const { CaluclateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-blue-600">
        Doctor Appointments
      </h3>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        {/* Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-4 sm:px-6 py-3 bg-blue-50 font-semibold text-gray-700 border-b text-sm sm:text-base">
          <p>#</p>
          <p>Patient</p>
          <p className="hidden sm:block">Payment</p>
          <p className="hidden md:block">Age</p>
          <p>Date</p>
          <p className="hidden sm:block">Time</p>
          <p className="hidden lg:block">Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No appointments found.
          </div>
        ) : (
          appointments.reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-4 sm:px-6 py-3 border-b items-center text-sm hover:bg-gray-50"
            >
              <p>{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  alt="User"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <p className="truncate">{item.userData.name}</p>
              </div>

              <p className="hidden sm:block">{item.payment ? "Online" : "Cash"}</p>
              <p className="hidden md:block">{CaluclateAge(item.userData.dob)} yrs</p>
              <p>{slotDateFormate(item.slotDate)}</p>
              <p className="hidden sm:block">{item.slotTime}</p>
              <p className="hidden lg:block">₹{item.amount}</p>

              {item.cancelled ? (
                <p className="text-red-600 text-xs font-medium text-[15px]">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-600 text-xs font-medium text-[15px]">Completed</p>
              ) : (
                <div className="flex gap-2 items-center">
                  <img
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-15 h-15 cursor-pointer"
                    onClick={() => cancelAppointment(item._id)}
                  />
                  <img
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => completeAppointment(item._id)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
