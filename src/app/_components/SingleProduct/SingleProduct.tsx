// import React from 'react'
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import Link from 'next/link'
// import Image from 'next/image'
// import { ProductType } from '@/types/Product.type'
// import AddBtn from './../AddBtn/AddBtn';
// import WishlistBtn from './../WishListbtn/WishlistBtn';


// export default function SingleProduct({product}:{product:ProductType}) {
//     return <>
    
//     <div className='w-full md:w-1/2  lg:w-1/4 xl:w-1/5 ' >
//    <div className="prod p-3">
//           <Card className='gap-2 p-2 relative'>
//             <WishlistBtn productId={product.id} />
//    <Link href={`/products/${product.id}`}>     
//   <CardHeader>
//                 <CardTitle>
//                   <Image src={product.imageCover} alt="test" width={100} height={100} />
//                 </CardTitle>
//     <CardDescription className='text-emerald-500'>{ product.category.name}</CardDescription>
//   </CardHeader>
//   <CardContent className='font-bold'>
//     <p className='line-clamp-1'>{ product.title}</p>
//   </CardContent>
//   <CardFooter>
//               <div className='flex justify-between w-full'>
//      <span>{ product.price}EGP</span>
//      <span>{ product.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
//     </div>
//      </CardFooter>
//             </Link>  
//             <AddBtn id={product.id}/>
//        {/* <Button className='cursor-pointer'>Add To Cart</Button> remove it bec it will be use client*/}
//         </Card>
//         </div>
      
    
//         </div>
    
//     </>
// }
import React from 'react';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/types/Product.type';
import AddBtn from './../AddBtn/AddBtn';
import WishlistBtn from './../WishListbtn/WishlistBtn';
 // Import the new client component

export default function SingleProduct({ product, isInitialInWishlist }: { product: ProductType; isInitialInWishlist: boolean }) {
    return (
        <div className='w-full md:w-1/2 lg:w-1/4 xl:w-1/5'>
            <div className="prod p-3">
                <Card className='gap-2 p-2 relative'>
                    <WishlistBtn productId={product.id} isInitialInWishlist={isInitialInWishlist} />
                    <Link href={`/products/${product.id}`}>
                        <CardHeader>
                            <CardTitle>
                                <Image src={product.imageCover} alt="test" width={100} height={100} />
                            </CardTitle>
                            <CardDescription className='text-emerald-500'>{product.category.name}</CardDescription>
                        </CardHeader>
                        <CardContent className='font-bold'>
                            <p className='line-clamp-1'>{product.title}</p>
                        </CardContent>
                        <CardFooter>
                            <div className='flex justify-between w-full'>
                                <span>{product.price}EGP</span>
                                <span>{product.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
                            </div>
                        </CardFooter>
                    </Link>
                    <AddBtn id={product.id} />
                </Card>
            </div>
        </div>
    );
}