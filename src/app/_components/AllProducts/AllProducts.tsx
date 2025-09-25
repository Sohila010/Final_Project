import getAllProducts from '@/api/getProducts.api';
import React from 'react'
import SingleProduct from '../SingleProduct/SingleProduct';
import { ProductType } from '@/types/Product.type';
import  getUserWishlist  from '@/WishListActions/getallwishlist.action';

// export default async function AllProducts() {


//      let data=await getAllProducts()
//   console.log(data);
//     return <>
//       <div className='container w-[80%] mx-auto flex flex-wrap'>
//       {data.map((currentproduct:ProductType) =>
//         <SingleProduct product={currentproduct } key={currentproduct.id} />
      
//       )}
//   </div>
    
    
//     </>
// }

export default async function AllProducts() {
    let data = await getAllProducts();
    const wishlistItems = await getUserWishlist();
    const wishlistIds = new Set(wishlistItems?.map((item: any) => item._id));
    
    return (
        <div className='container w-[80%] mx-auto flex flex-wrap'>
            {data.map((currentproduct: ProductType) =>
                <SingleProduct
                    product={currentproduct}
                    key={currentproduct.id}
                    isInitialInWishlist={wishlistIds.has(currentproduct.id)}
                />
            )}
        </div>
    );
}