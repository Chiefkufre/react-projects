import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './components.css';


const Header = () => {

  const [pageState, setPageState] = useState("Login");

  const auth = getAuth();

  useEffect(() =>{

    onAuthStateChanged(auth, (user) =>{
    if(user){
      setPageState("Profile")
    }else{
      setPageState("Login")
    }
   })
  }, [auth])

  const location = useLocation();
  const navigate = useNavigate();

  // check path name
  function pathMatchRoute(route){
    if(route === location.pathname) return true;
    return false;
  }

    

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      
    
    <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div className="col image-logo">
                    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor logo clone" className='h-5 cursor-pointer' onClick={()=>navigate("/")}/>
                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li className={`nav__items ${pathMatchRoute('/') && "nav__items--active"}`} onClick={()=>navigate("/")}>Home</li>
                        <li className={`nav__items ${pathMatchRoute('/offers') && "nav__items--active"}`} onClick={()=>navigate("/offers")}>Offers</li>
                        <li className={`nav__items ${ (pathMatchRoute('/login') || pathMatchRoute('/profile') ) && "nav__items--active"}`} onClick={()=>navigate("/profile")}>{pageState}</li>
                        <li className={`nav__items ${pathMatchRoute('/register') && "nav__items--active"}`} onClick={()=>navigate("/register")}>Register</li>
                    </ul>
                </div>
    </header>
    </div>
  )
}

export default Header