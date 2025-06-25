import React, { use } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>

    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">All Doctors</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {doctors.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-60 "
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{item.speciality}</p>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              onChange={() => changeAvailability(item._id)}
              checked={item.available}
              readOnly
              className="w-4 h-4"
            />
            <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
              {item.available ? 'Available' : 'Unavailable'}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default DoctorsList;
