import { getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

import ListingItem from "../components/ListingItem";

const Profile = () => {

  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {email, name} = formData;
  
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

  useEffect(()=>{
      const fetchUserListings = async()=>{
          const listingRef = collection(db,  "listings");
          const q =  query(listingRef, 
                  where("userRef", "==", auth.currentUser.uid), 
                      orderBy("timestamp", 'desc'));
          const querySnap = await getDocs(q);
          let listings = [];
          querySnap.forEach((doc) =>{
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setListings(listings);
          setLoading(false);
      }
      fetchUserListings();
  }, [auth.currentUser.uid])
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
          <Link to="/create-listing">
           <div className='flex items-center justify-center bg-blue-600 py-2 text-white text-center font-sm rounded-2xl shadow-md cursor-pointer hover:bg-blue-800  transition duration-150 ease-in-out hover:shadow-lg active:shadow-md'>
              <AiOutlineHome className="bg-dark mr-2 text-2xl rounded-full p-1 border-2" />
              <button type="submit" className='uppercase'> Add listing</button>
          </div>
          </Link>
        </div>
    </section>
                <div className="max-w-6xl px-3 mt-6 mx-auto">
                  {!loading  && listings.length > 0 && (
                    <>
                    <h2 className="text-2xl text-center font-semibold mb-6">My Listing</h2>
                    
                    <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6">
                      {listings.map((listing) => (

                          <ListingItem 

                            key={listing.id} 
                            id={listing.id} 
                            listing={listing.data} 
                          
                          />
                      ))}
                    </ul>
                    </>

                    

                  )}
                </div>
    </>
    
  )
}

export default Profile;