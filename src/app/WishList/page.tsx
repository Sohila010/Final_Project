// /app/WishList/page.tsx
import React from 'react';
import { ProductType } from '@/types/Product.type'; // Import ProductType if not already imported
import  getWishlistProducts  from '@/WishListActions/getallwishlist.action';
import SingleProduct from '../_components/SingleProduct/SingleProduct';

// This must be a default export and a React component
export default async function WishlistPage() {
    // Fetch the products from the wishlist
    const wishlistProducts = await getWishlistProducts();

    if (!wishlistProducts || wishlistProducts.length === 0) {
        return <div className='container mx-auto p-8 text-center'>
            <h1 className='text-3xl font-bold'>Your Wishlist is Empty! 😔</h1>
            <p className='mt-4 text-gray-600'>Start adding some products you love.</p>
        </div>;
    }

    // Since all these products are in the wishlist, you can pass true for the prop
    return (
        <div className='container w-[80%] mx-auto p-8'>
            <h1 className='text-3xl font-bold mb-8 text-center'>My Wishlist</h1>
            <div className='flex flex-wrap -mx-3'>
                {wishlistProducts.map((product: ProductType) => (
                    <SingleProduct
                        key={product.id}
                        product={product}
                        isInitialInWishlist={true} // Since this is the wishlist page, they are all in the list
                    />
                ))}
            </div>
        </div>
    );
}