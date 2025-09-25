import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import getAllProducts from '@/api/getProducts.api'
import SingleProduct from '../_components/SingleProduct/SingleProduct';
import AllProducts from '../_components/AllProducts/AllProducts';

export default async function Products() {
  // let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
  // let {data}= await response.json()

  // let data=await getAllProducts()
  // console.log(data);

  return <>
    
    {/* <div className='container w-[80%] mx-auto flex flex-wrap'>
      {data.map((currentproduct) =>
        <SingleProduct product={currentproduct } key={currentproduct.id} />
      
      )}
  </div> */}
  <AllProducts/>
  
  
  </>
}
