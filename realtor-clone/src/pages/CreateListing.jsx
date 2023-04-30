import { useState } from "react";






const CreateListing = () => {

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
        photo_url: "",
    })

    const {type, name, beds, baths, packingSpot, furnished, address, description, offer, price, discount, photo_url} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
  return (
    <main className='max-w-md md:px-6 sm:px-6 mx-auto'>
        <h1 className='text-3xl  text-center mt-6 font-semibold'>Add New Listing</h1>

        <div>
            <form>
               
            <div>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
                <div className='flex items-center justify-center cursor-pointer mt-2'>
                    <button type="button" id='type' value="sell" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-m rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "sell" ? "bg-slate-600 text-white" : "bg-white text-black"}`}>Sell</button>

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
                        <div className="ml-2 flex">
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