import React from 'react'
import ItemsCard from './ItemsCard/ItemsCard'

const ShoppingPage = () => {
  return (
    <div className='flex flex-wrap gap-2'>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
        <ItemsCard/>
    </div>
  )
}

export default ShoppingPage