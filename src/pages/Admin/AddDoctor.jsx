import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../../assets/assets";
import {AdminContext} from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

const [docImg, setDocImg] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState(""); 
const [password, setPassword] = useState("");
const [experience, setExperience] = useState('1 Year');
const [fees, setFees] = useState("");
const [speciality, setSpeciality] = useState('General physician');
const [degree, setDegree] = useState("");
const [about, setAbout] = useState("");
const [address, setAddress] = useState("");

const { backendUrl, aToken} = useContext(AdminContext)

const onSubmitHandler = async (e) => {
e.preventDefault();

try{
  if(!docImg){
    return toast.error('Image not selected')
  }

  const formData = new FormData()
  formData.append('image',docImg)
  formData.append('name',name)
  formData.append('email',email)
  formData.append('password',password)
  formData.append('experience',experience)
  formData.append('fees',Number(fees))
  formData.append('about',about)
  formData.append('speciality',speciality)
  formData.append('degree',degree)
  formData.append('address',address)



  const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: {aToken}})

  if(data.success){
    toast.success(data.message)
    setDocImg(false)
    setName('')
    setPassword('')
    setEmail('')
    setAddress('')
    setAbout('')
    setDegree('')
    setExperience('')
    setFees('')
    setSpeciality('')

  }
  else{
    toast.error(data.message)
  }

}
catch (error){
  console.log('error')

}

}




  return (
    <form onSubmit={onSubmitHandler} className="m-10 w-full">
      {/* Avatar Upload Top Center */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="doc_img"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors"
        >
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="upload area"
            className="w-5 h-5 object-contain mb-4"
          />
          <input type="file" onChange={(e)=> setDocImg(e.target.files[0])} id="doc_img" hidden />
          <p className="text-gray-600 font-medium text-center text-sm">
            Upload Doctor <br /> Picture
          </p>
        </label>
      </div>

      {/* Form Fields Grid: 2 columns */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
        {/* Doctor Name */}
        <div>
          <label
            htmlFor="doctorName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Doctor Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="doctorName"
            placeholder="Enter Doctor name"
            required
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Doctor Email */}
        <div>
          <label
            htmlFor="doctorEmail"
            className="block text-gray-700 font-semibold mb-2"
          >
            Doctor Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="doctorEmail"
            placeholder="Enter Doctor email"
            required
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Doctor Password */}
        <div>
          <label
            htmlFor="doctorPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Doctor Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="doctorPassword"
            placeholder="Enter Doctor password"
            required
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Doctor Experience */}
        <div>
          <label
            htmlFor="doctorExperience"
            className="block text-gray-700 font-semibold mb-2"
          >
            Doctor Experience
          </label>
          <select onChange={(e)=> setExperience(e.target.value)} value={experience} id="" className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="1 Year"> 1 Year</option>
            <option value="2 Year"> 2 Year</option>
            <option value="3 Year"> 3 Year</option>     
            <option value="4 Year"> 4 Year</option>
            <option value="5 Year"> 5 Year</option> 
            <option value="6 Year"> 6 Year</option>
            <option value="7 Year"> 7 Year</option>
            <option value="8 Year"> 8 Year</option>
            <option value="9 Year"> 9 Year</option>
            <option value="10 Year"> 10 Year</option>
           </select>
          
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p>Fees</p>
          <input type="text" onChange={(e)=> setFees(e.target.value)} value={fees} placeholder="Enter Doctor Fees" className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Speciality */}

        <div>
          <label
            htmlFor="speciality"
            className="block text-gray-700 font-semibold mb-2"
          >
            Speciality
          </label>
          <select
            id="speciality"
            onChange={(e)=> setSpeciality(e.target.value)}
            value={speciality}
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label
            htmlFor="education"
            className="block text-gray-700 font-semibold mb-2"
          >
            Education
          </label>
          <input
            type="text"
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            id="education"
            placeholder="Enter Doctor Education"
            required
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address 1 */}
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold mb-2"
          >
            Address 
          </label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            id="address"
            placeholder="Address"
            required
            className="w-full min-w-[280px] border border-gray-300 rounded-md px-2 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> 

        {/* About Doctor - full width */}
        <div className="md:col-span-4 mb-2">
          <label
            htmlFor="aboutDoctor"
            className="block text-gray-700 font-semibold mb-2"
          >
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            id="aboutDoctor"
            placeholder="Enter about doctor"
            required
            className="w-full border border-gray-300 rounded-md px-2 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center ">
      <button
        type="submit"
        className="w-70 bg-blue-600 cursor-pointer text-white font-semibold py-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Doctor
      </button>
       </div>
    </form>
  );
};

export default AddDoctor;
