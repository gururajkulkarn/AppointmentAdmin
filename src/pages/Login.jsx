import React from 'react'
import { useState, useContext } from 'react'
import {assets} from '../assets/assets.js'
import {AdminContext} from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Login = () => {

const [state, setState] = useState('Admin')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


const {setAtoken, backendUrl} = useContext(AdminContext)
const {setDToken} = useContext(DoctorContext)



const onSubmitHandler = async (e) => {
  e.preventDefault()  
 try {
  if (state === 'Admin'){
    const {data} = await axios.post(backendUrl + '/api/admin/login', {
      email,
      password    
    })
    if(data.success){
      localStorage.setItem('atoken', data.token)
      setAtoken(data.token)
  
    }
    else{
      toast.error(data.message)
    }


  }
  else {
  
    const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
if(data.success){
      localStorage.setItem('dtoken', data.token)
      setDToken(data.token)
      console.log(data.token);
      
  
    }
    else{
      toast.error(data.message)
    }

  }
 }
 catch (error){

 }

}


  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
      <span className="text-indigo-600">{state}</span> Login
    </p>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
         onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
    >
      Login
    </button>
    {
       state === 'Admin'
       ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')} >click here</span></p>
       : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')} >click here</span></p>
    }
  </div>
</form>

  )
}

export default Login