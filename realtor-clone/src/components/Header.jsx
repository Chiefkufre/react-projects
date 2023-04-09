import { useLocation, useNavigate} from "react-router-dom"
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
                        <li className={`cursor-pointer py-3 tex-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute('/') && "text-black border-b-red-500"}`}onClick={()=>navigate("/")}>Home</li>
                        <li className={`cursor-pointer py-3 tex-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute('/profile') && "text-black border-b-red-500"}`} onClick={()=>navigate("/profile")}>Profile</li>
                        <li className={`cursor-pointer py-3 tex-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute('/offers') && "text-black border-b-red-500"}`} onClick={()=>navigate("/offers")}>Offers</li>
                        <li className={`cursor-pointer py-3 tex-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute('/login') && "text-black border-b-red-500"}`} onClick={()=>navigate("/login")}>Login</li>
                        <li className={`cursor-pointer py-3 tex-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute('/register') && "text-black border-b-red-500"}`} onClick={()=>navigate("/register")}>Register</li>
                    </ul>
                </div>
    </header>
    </div>
  )
}

export default Header