import React from 'react'

const ListingItem = ({listing, id}) => {

  const images = listing.imgUrls;
  console.log(images)
  return (
    <>
    {images.map((image) => (
      <div>{image}</div>
    ))}
    </>
  )
}

export default ListingItem;