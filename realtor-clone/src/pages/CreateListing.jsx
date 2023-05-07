import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";





const CreateListing = () => {

    const mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`;
    const navigate = useNavigate();
    const auth = getAuth();
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        beds: 1,
        baths: 1,
        packingSpot: "false",
        furnished: "false",
        address: "",
        description: "",
        offer:  "false",
        price: 50,
        discount: 45,
        photo_url: {},
        latitude: 0,
        longitude: 0,
    })

    const {type, name, beds, baths, packingSpot, furnished, address, description, 
        latitude, longitude, offer, price, discount, photo_url} = formData;

    const onChange = (e) => {
            
        const boolean = e.target.value === 'true' ? "true" : e.target.value === 'false' ? "false" : null;


        if(e.target.files){
            setFormData((prevState) =>({
                ...prevState,
                photo_url: [e.target.files]
            }))
        }
        if(!e.target.files){
            setFormData((prevState) =>({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    };

    const onSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)

        if(discount >= price){
            setLoading(false);
            toast.error("Discounted Price must be less than regular price")
        return;

        }

        if (photo_url.length > 6) {
            setLoading(false);
            toast.error("You can not add more than 6 images")
            return;
        }

        let geoLocation = {};

        let location;

        if(geoLocationEnabled){
            const response = await fetch(mapURL);
            const responseData = response.json();
            geoLocation.lat = responseData.results[0]?.geometry.location.lat ?? 0;
            geoLocation.lng = responseData.results[0]?.geometry.location.lng ?? 0;

            location = responseData.status === "ZERO_RESULTS" && undefined;

            if (location === undefined) {

                setLoading(false);
                toast.error("please enter a correct address");
                return;
            }
            
        }else{
            geoLocation.lat = latitude;
            geoLocation.lng = longitude;
        }

        const storeImage = async(image) => {
            return new Promise((resolve, reject) => {
                
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

                const storageRef = ref(storage, filename);

                const uploadTask = uploadBytesResumable(storageRef, image)
                
                // Listen for state changes, errors, and completion of the upload.

                uploadTask.on('state_changed',(snapshot) => {

                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                

                switch (snapshot.state) {
                    case 'paused':
                        toast.success("File upload paused")
                    break;
                    case 'running':
                    toast.error('Image is uploading');
                    break;
                  }
                }, 
                (error) => {
                
                switch (error.code) {
                    case 'storage/unauthorized':
                    toast.error("You doesn't have permission to access the object")
                    break;
                    case 'storage/canceled':
                        toast.error("You canceled the upload")
                    break;

                    case 'storage/unknown':
                        toast.error("Error occur while uploading file. Please try again later")
                    break;
                  }
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                      .then((downloadURL) => {
                        resolve(downloadURL);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  }
                );
                
            })

        }

        try {
            const imgUrls = await Promise.all([...photo_url].map((image) => storeImage(image)));

          } catch (error) {
            setLoading(false);
            toast.error("Images could not be uploaded");
            return;
          }
          

    }

    if (loading) {
        return <Spinner />
    }
  return (
    <main className='max-w-md md:px-6 sm:px-6 mx-auto'>
        <h1 className='text-3xl  text-center mt-6 font-semibold'>Add New Listing</h1>

        <div>
            <form onSubmit={onSubmit}>
               
            <div>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex items-center justify-center cursor-pointer mt-2'>
                    <button type="button" id='type' value="sale" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "sale" ? "bg-slate-600 text-white" : "bg-white text-black"}`}>Sell</button>

                    <button type="button" id='type' value="rent" onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-slate-600 text-white" : "bg-white text-black"}`}>Rent</button>
                </div>
            </div>


                <div className="mt-6 mb-6">
                    <p className="font-semibold text-lg">Name</p>
                    <div>
                        <input type="text" id="name" value={name} onChange={onChange} placeholder="Property Name"
                        maxLength="32" minLength="10" required className="w-full 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 max-w-auto" />
                    </div>
                </div>

                <div className="flex">

                    {/* select field one */}

                    <div className="mr-2">
                    <p className="font-semibold text-lg">Beds</p>
                    <div>
                        <input type="number" id="beds" value={beds} onChange={onChange} maxLength="1" minLength="50" required className="w-full 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 text-center" />
                    </div>
                </div>

                {/* select field two */}

                <div className="ml-2">
                    <p className="font-semibold text-lg">Baths</p>
                    <div>
                        <input type="number" id="baths" value={baths} onChange={onChange} maxLength="1" minLength="50" required className="w-full 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 text-center" />
                    </div>
                </div>
                </div>

                <div className="mt-6">
                <p className='text-lg font-semibold'>Packing spot</p>
                <div className='flex items-center justify-center cursor-pointer mt-2'>
                    <button  type="button" id='packingSpot' value="true" onClick={onChange} className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${packingSpot === "true" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Yes</button>

                    <button  type="button" id='packingSpot' value="false" onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${packingSpot === "false" ? "bg-slate-600 text-white " : "bg-white text-black"}`}
                    >No</button>
                </div>
                </div>

                <div className="mt-6">
                <p className='text-lg  font-semibold'>Furnished</p>
                <div className='flex items-center justify- col-span-6 cursor-pointer mt-2'>
                    <button  type="button" id='furnished' value="true" onClick={onChange} className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${furnished === "true" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >Yes</button>

                    <button  type="button" id='furnished' value="false" onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${furnished === "false" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >No</button>
                </div>
                </div>

                <div className="mt-6 mb-6">
                    <p className="font-semibold text-lg">Address</p>
                    <div>
                        <textarea type="textarea" id="address" value={address} onChange={onChange} placeholder="property location"
                             required className="w-full 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 max-w-auto" />
                    </div>
                </div>
                {!geoLocationEnabled && (
                    <div className="flex space-x-3">
                        <div className="text-lg font-semibold">
                            <p>Latitude</p>
                            <input type="number"  id="latitude" value={latitude} onChange={onChange} required 
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded
                            transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center "/>
                        </div>

                        <div className="text-lg font-semibold">
                            <p>Longitude</p>
                            <input type="number"  id="longitude" value={longitude} onChange={onChange} required 
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded
                            transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center "/>
                        </div>
                    </div>
                )}
                <div className="mt-6 mb-6">
                    <p className="font-semibold text-lg">Description</p>
                    <div>
                        <textarea type="textarea" id="description" value={description} onChange={onChange} placeholder="description"
                             required className="w-full 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 max-w-auto" />
                    </div>
                </div>

                <div className=" mt-6">
                <p className='text-lg font-semibold'>Offer</p>
                <div className='flex items-center justify-center cursor-pointer mt-2'>
                    <button  type="button" id='offer' value="true" onClick={onChange} className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${offer === "true" ? "bg-slate-600 text-white" : "bbg-white text-black"}`}
                    >Yes</button> 

                    <button  type="button" id='offer' value="false" onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg 
                    focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                    ${offer === "false" ? "bg-slate-600 text-white" : "bg-white text-black"}`}
                    >No</button>
                </div>
                </div>
                

                <div >

                    {/* select field one */}

                    <div className="mt-4">
                    <p className="font-semibold text-lg">Regular price</p>
                    <div className="flex items-center">
                    <div>
                        <input type="number" id="price" value={price} onChange={onChange} maxLength="50" minLength="500000" required className=" 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 text-center" />
                    </div>

                    { type === "rent" && (
                        <div className="ml-2">
                        <p className="text-center font-semibold text-md w-full whitespace-nowrap">$ / Months</p>
                    </div>
                    )}
                    
                    </div>

                </div>

                {/* select field two */}

                <div className="mt-4">
                    <p className="font-semibold text-lg">Discounted Price</p>
                    <div>
                        <input type="number" id="discount" value={discount} onChange={onChange} maxLength="10" minLength="500000" required className=" 
                        py-2 px-4 text-xl text-gray-700  bg-white border-gray-300 rounded transition duration-150
                        ease-in-out focus:gray-700 focus:bg-white focus:border-slate-600 text-center" />
                    </div>
                </div>
                </div>

                <div className="mt-4">
                    <p className="font-semibold text-lg">Image</p>
                    <small className="text-red-600">The first image will be the cover image (Max 6) </small>
                    <div>
                        <input type="file" name="image" id="photo_url" accept=".jpg, .jpeg, .png" multiple required onChange={onChange} className="w-full py-2 px-4 text-xl text-gray-700 border-gray-300 rounded 
                        transition duration-150  ease-in-out focus:bg-white focus:border-slate-600 hover:border-gray-300 active:border-gray-300" />
                    </div>

                </div>

                <div className="flex items-center justify-center mt-6 bg-blue-600 rounded-lg transition duration-150 
                ease-in-out text-center text-white shadow-md hover:bg-blue-800 hover:shadow-lg cursor-pointer focus:bg-blue-800 active:bg-blue-800">
                    <input type="submit" value="Create Listing" className="uppercase m-2 p-2 font-medium" />
                </div>
            </form>
        </div>
    </main>
  )
}

export default CreateListing;