import ShoppingPage from '@/components/ShoppingPage/ShoppingPage'
import axios from 'axios'
import React from 'react'

const Shop = async () => {
  const data = await axios.get("https://fakestoreapi.com/products")
  console.log(data.data);
  return (
    <>
        <ShoppingPage products={data.data}/>
    </>
  )
}

export default Shop;
