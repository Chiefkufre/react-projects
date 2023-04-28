
import { Link, useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {useState } from "react";

import { doc, getDoc, setDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Profile = () => {

  const navigate = useNavigate()

  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {email, name} = formData;
  
  const [changeDetail, setChangeDetail] = useState(false);

  const onChange = (e) =>{
    e.preventDefault();

    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value,

    }));
  }
  const onLogout = (e) => {
    e.preventDefault();
      auth.signOut();
      navigate('/');
  }

  const onSubmit = async(e) =>{
  

    try {
      
      if (auth.currentUser.displayName !== name){
          await updateProfile(auth.currentUser, {
            displayName: name,
          });

          // updata name in firebase store
          const docRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(docRef, {
            name,          
          })
        }
      toast.success('profile name updated successfully')
    } catch (error) {
      toast.error("could not update profile detail")
    }
    
  }
  return (
    <>
    <section className='mt-12 max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl font-bold'>My profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form onSubmit={onSubmit}>
          <input type="text" id='name' value={name} disabled={!changeDetail} onChange={onChange} className={`w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200, focus:bg-red-200"}`} />
          <input type="email" id='email' value={email} disabled className='w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />
          
          <div className="flex whitespace-nowrap text-sm sm:text-lg mb-6">
            <p>Do you want to change your name? 
              <span

                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState)
                }}
              className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ">
                {changeDetail ? 'Apply change' : 'Edit'}
              </span>
            </p>
            <p onClick={onLogout} className="text-blue-600 ml-auto hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer ">Sign out</p>
            
          </div>
          </form>
        </div>
    </section>
    
    </>
    
  )
}

export default Profile;