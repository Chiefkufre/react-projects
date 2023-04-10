import { FcGoogle} from "react-icons/fc"

const OAuth = () => {
  return (
    <div className='flex items-center justify-center bg-red-600 py-2 text-white text-center font-sm rounded-2xl shadow-md cursor-pointer hover:bg-red-800  transition duration-150 ease-in-out hover:shadow-lg active:shadow-md'>
        <FcGoogle className="bg-white rounded-full mr-2"/>
        <input className='uppercase' type="button" value="Continue with Google" />
    </div>
  )
}

export default OAuth