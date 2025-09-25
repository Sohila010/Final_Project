import { Button } from '@/components/ui/button'
import { ProductType } from '@/types/Product.type'
import React from 'react'

export default function ProductDetails({data}:{data:ProductType}) {
    return <>
         <div className="container w-[80%] mx-auto p-2 flex">
            <div className="w-1/4">
                <div className="det p-4">
                    <img src={data.imageCover} className='w-full' alt=''/>
            </div>
            </div>
            <div className="w-3/4">
                <div className="content p-4">
                    <h1 className='text-2xl font-bold my-4'>{data.title}</h1>
                    <p>{data.description}</p>
                    <p className='text-emerald-600 my-2'>{data.category.name}</p>
             <div className='flex justify-between w-full my-4'>
     <span>{ data.price}EGP</span>
     <span>{ data.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
                    </div>
                    
                    <Button className='w-full my-2'>Add To Cart </Button>
            </div>
            </div>
    </div>
    
    
    </>
}
