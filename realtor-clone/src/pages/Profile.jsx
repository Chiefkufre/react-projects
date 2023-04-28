
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {useState } from "react";


const Profile = () => {

  const navigate = useNavigate()

  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {email, name} = formData;
  
  const onLogout = (e) => {
    e.preventDefault();
      auth.signOut();
      navigate('/');
  }
  return (
    <>
    <section className='mt-12 max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold'>My profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
          <input type="text" id='name' value={name} disabled className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />
          <input type="email" id='email' value={email} disabled className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />
          
          <div className="flex whitespace-nowrap text-sm sm:text-lg mb-6">
            <p>Do you want to change your name? <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ">Edit</span> </p>
            <p onClick={onLogout} className="text-blue-600 ml-auto hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer ">Sign out</p>
            
          </div>
          </form>
        </div>
    </section>
    
    </>
    
  )
}

export default Profile;