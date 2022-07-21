import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: {images, name, slug, price} }) => {
  return (
    <div>
      {/* {console.log("Image",images)} */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(images && images[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product