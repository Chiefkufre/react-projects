import { Link } from 'react-router-dom';
import {MdLocationOn } from 'react-icons/md';
import {FaTrash} from 'react-icons/fa';
import {MdEdit} from 'react-icons/md'
import moment from 'moment';

const ListingItem = ({ listing, id, onDelete, onEdit }) => {

  let discountedPrice = listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let regularPrice = listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let timestamp = listing.timestamp.toDate();
  const relativeTime = moment(timestamp).fromNow();

  return (
    <li className='relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md
                    overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale  
                          md:transition-scale sm:transition-scale duration-150 ease-in' 
        loading="lazy" src={listing.imgUrls[0]} alt="house" />
        <p className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs \
                      font-semibold py-1 px-2 rounded-md shadow-lg'>{relativeTime}</p>
        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-5 w-5 text-green-600'/>
            <p className='font-semibold text-sm mb-[2px] text-green-600 truncate'>{listing.address}</p>
          </div>
          <p className='font-semibold text-xl m-0 truncate'>{listing.name}</p>

          <p className='text-[#457b9d] mt-2 font-semibold'>${listing.offer ? discountedPrice : regularPrice}
          {listing.type === "rent" && "/month"}
          </p>
          <div className='flex items-center mt-[2px] space-x-3'>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"} 
              </p>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-xs'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"} 
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (

        <FaTrash  className='absolute bottom-2 right-2 h-[14px] 
                cursor-pointer text-red-500' 
                onClick={()=> onDelete(listing.id)}
                />
      )}

      {onEdit && (

      <MdEdit  className='absolute bottom-2 right-10 h-4 
              cursor-pointer text-blue-500' 
              onClick={()=> onEdit(listing.id)}
              />
      )}
    </li>
  );
};

export default ListingItem;
