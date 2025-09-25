// // components/WishlistBtn/WishlistBtn.tsx
// "use client";

// import addToWishList from '@/WishListActions/wishList.action';
// import React, { useState, useTransition } from 'react';
// import { FaHeart } from 'react-icons/fa';
// import { toast } from 'sonner';
// // import { addToWishlist } from '@/app/actions'; // Import the server action

// export default function WishlistBtn({ productId }: { productId: string }) {
//     const [isWished, setIsWished] = useState(false);
//     const [isPending, startTransition] = useTransition();

//     const handleClick = () => {
//         startTransition(async () => {
//             const result = await addToWishList(productId);
//             if (result.success) {
//                 setIsWished(true);
//                 // Optionally show a success notification (toast) here
//                 // console.log(result.message);
//                 toast.success("Added To WishList Successfully ❤️",{position:"top-center",duration:2000})
//             } else {
//                 // Optionally show an error notification here
//                 toast.error("Can`t Added To WishList",{position:"top-center",duration:2000})
//             }
//         });
//     };

//     return (
//         <button
//             onClick={handleClick}
//             disabled={isPending}
//             className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             aria-label="Add to wishlist"
//         >
//             <FaHeart className={`w-5 h-5 transition-colors ${isWished ? 'text-emerald-500' : 'text-gray-400'}`} />
//         </button>
//     );
// }

// components/SingleProduct/WishlistBtn.tsx
'use client';

import { useState } from 'react';
import { addToWishList, removeFromWishlist } from '@/WishListActions/wishList.action';
import { useRouter } from 'next/navigation';

export default function WishlistBtn({ productId, isInitialInWishlist }: { productId: string; isInitialInWishlist: boolean }) {
    const [inWishlist, setInWishlist] = useState(isInitialInWishlist);
    const router = useRouter();

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWishlist) {
            const res = await removeFromWishlist(productId);
            if (res.success) {
                setInWishlist(false);
                // Optionally, show a toast or message
            } else {
                // Handle error, maybe show a toast
                console.error(res.message);
            }
        } else {
            const res = await addToWishList(productId);
            if (res.success) {
                setInWishlist(true);
                // Optionally, show a toast or message
            } else {
                // Handle error, maybe show a toast
                console.error(res.message);
                if (res.message === "You must be logged in.") {
                    router.push('/login'); // Redirect to login page
                }
            }
        }
    };

    return (
        <button
            onClick={handleWishlistToggle}
            className='absolute top-2 right-2 p-2 rounded-full z-10'
            aria-label="Toggle wishlist"
        >
            <i className={`fas fa-heart ${inWishlist ? 'text-emerald-500' : 'text-gray-400'}`}></i>
        </button>
    );
}