import { FcGoogle} from "react-icons/fc"
import { useNavigate } from "react-router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';



const OAuth = () => {

  const navigate = useNavigate();

  const googleSignUp = async() =>{

    try {

      // Sign in using a popup.
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const docRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(docRef,  {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
         });
        navigate("/");
        toast.success("account created successfully");
       
      }else{
        toast.info("email also exists. Please login");
        navigate("/login");
        
      }

      

       
    }catch(error){

      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode, errorMessage);
    // The email of the user's account used.
      const email = error.customData.email;
    // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

    }

  }
  return (
    <div className='flex items-center justify-center bg-red-600 py-2 text-white text-center font-sm rounded-2xl shadow-md cursor-pointer hover:bg-red-800  transition duration-150 ease-in-out hover:shadow-lg active:shadow-md'>
        <FcGoogle className="bg-white rounded-full mr-2"/>
        <input className='uppercase' type="button" value="Continue with Google" onClick={googleSignUp}/>
    </div>
  )
}

export default OAuth