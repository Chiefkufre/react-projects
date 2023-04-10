import { useLocation, useNavigate} from "react-router-dom"
import './components.css'


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMathRoute(route){
    if(route === location.pathname) return true;
    return false;
  }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      
    
    <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div className="col image-logo">
                    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor logo clone" className='h-5 cursor-pointer' onClick={()=>navigate("/")}/>
                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li className={`nav__items ${pathMathRoute('/') && "nav__items--active"}`}onClick={()=>navigate("/")}>Home</li>
                        <li className={`nav__items ${pathMathRoute('/profile') && "nav__items--active"}`} onClick={()=>navigate("/profile")}>Profile</li>
                        <li className={`nav__items ${pathMathRoute('/offers') && "nav__items--active"}`} onClick={()=>navigate("/offers")}>Offers</li>
                        <li className={`nav__items ${pathMathRoute('/login') && "nav__items--active"}`} onClick={()=>navigate("/login")}>Login</li>
                        <li className={`nav__items ${pathMathRoute('/register') && "nav__items--active"}`} onClick={()=>navigate("/register")}>Register</li>
                    </ul>
                </div>
    </header>
    </div>
  )
}

export default Header