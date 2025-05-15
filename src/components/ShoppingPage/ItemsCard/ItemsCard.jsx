import Image from 'next/image'
import React from 'react'

const ItemsCard = ({product}) => {
  return (
    <div className='w-[200px] h-[300px] rounded-md p-4 bg-sky-600 flex flex-col' >
      <h1 className='h-[100px]'>
      {product.title}
      </h1>
      <Image width={100} height={100} alt='mp' src={product.image} />
      </div>
  )
}

export default ItemsCard