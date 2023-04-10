import { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';


const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const  {email} = formData;

  return (
    <section>
     <h1 className='text-3xl text-center font-bold mt-6'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="realtor clone" 
          className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form action="" >
            <input type="email" id='email' value={email} onChange={onChange} placeholder='Email Address' className='mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to="/register" className='text-red-600 hover:text-red-900 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-900 transition duration-200 ease-in-out'>Forgot Password</Link>
              </p>
            </div>
            <div className='bg-blue-600 text-center py-2 rounded-2xl text-white text-sm font-medium hover:bg-blue-800 cursor-pointer transition duration-150 ease-in-out hover:shadow-lg'>
              <input className='uppercase' type="button" value="Submit" />
            </div>
          </form>
          <div className='flex text-center my-4 before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400'>
          <p className='text-center font-semibold mx-4'>OR</p>
          </div>

          <OAuth />
          </div>
      </div>
      </section>
      
  )
}

export default ForgotPassword