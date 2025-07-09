import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async (req, res) => {
    try {
      const updateData = {
        fees: profileData.fees,
        available: profileData.available
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0 flex justify-center items-start">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-xl object-cover shadow-xl border-4 border-blue-400"
          />
        </div>

        {/* Right: Profile Details */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-900">
              {profileData.name}
            </h1>
            <p className="text-xl text-gray-700 mt-1">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              {profileData.experience} years experience
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <p className="text-gray-700">{profileData.about}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Appointment Fees
            </h2>
            <p className="text-gray-700">
              ₹
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}{" "}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Clinic Address
            </h2>
            <p className="text-gray-700">{profileData.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={profileData.available}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="available" className="text-gray-800 text-md">
              Available
            </label>
          </div>

          <div>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
