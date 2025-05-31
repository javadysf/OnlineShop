import Landing from "@/components/Landing/Landing"
import axios from "axios"

const page = async() => {
  const data = await axios.get("https://fakestoreapi.com/products")
  return (
    <>
    <Landing products={data.data}/> 
    </>
  )
}

export default page