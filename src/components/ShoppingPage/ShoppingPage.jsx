import React from 'react'
import ItemsCard from './ItemsCard/ItemsCard'

const ShoppingPage = ({products}) => {
  return (
    <div className='flex p-4 flex-wrap gap-4'>
      {products.map((product)=>
        <ItemsCard key={product.id} product = {product} />
      )}

    </div>
  )
}

export default ShoppingPage