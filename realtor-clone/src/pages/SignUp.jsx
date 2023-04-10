import { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useNavigate } from 'react-router-dom';

// Firebase imports
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';


const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async(e) =>{
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredentials.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();


      await addDoc(collection(db, 'users'), {
       ...formDataCopy,

      });
      navigate("/");
      toast.success("account created successfully");

    }catch (error) {
      toast.error("Unable to create account. Please try again");
    }
  }
  const  {name, email, password} = formData;
  return (
    <section className=''>
     <h1 className='text-3xl text-center font-bold mt-6'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="realtor clone" 
          className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          <input type="text" id='name' value={name} onChange={onChange} placeholder='Full Name' className='mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />

            <input type="email" id='email' value={email} onChange={onChange} placeholder='Email Address' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />

          <div className='relative mb-12'>
          <input type={showPassword ? "text" : "password"} id='password' value={password} onChange={onChange} placeholder='Enter Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ransition ease-in-out mt-2'  />


          {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-5 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/> ): ( <AiFillEye className='absolute right-3 top-5 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>)}
          </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?
                <Link to="/login" className='text-red-600 hover:text-red-900 transition duration-200 ease-in-out ml-1'>Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-900 transition duration-200 ease-in-out'>Forgot Password</Link>
              </p>
            </div>
            <div className='bg-blue-600 text-center py-2 rounded-2xl text-white text-sm font-medium hover:bg-blue-800 cursor-pointer transition duration-150 ease-in-out hover:shadow-lg'>
              <input className='uppercase' type="submit" value="Sign up" />
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

export default SignUp