
// "use server";

// import GetMyToken from "@/Utilities/getMyToken";
// import { revalidatePath } from "next/cache";

// export default async function addToWishList(productId: string) {
//     const token = await GetMyToken();

//     // 1. Check if the token was retrieved successfully
//     console.log("Retrieved Token:", token);
//     if (!token) {
//         console.error("Authentication failed: Token is null.");
//         return { success: false, message: "You must be logged in." };
//     }

//     try {
//         const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'token': token,
//             },
//             body: JSON.stringify({ productId }),
//         });

//         const data = await res.json();

//         // 2. Log the entire API response to see the exact message
//         console.log("API Response Status:", res.status);
//         console.log("API Response Body:", data);

//         if (!res.ok) {
//             // Use the actual message from the API for better error handling
//             return { success: false, message: data.message || "Failed to add item." };
//         }
        
//         revalidatePath('/wishlist');
        
//         return { success: true, message: data.message };

//     } catch (error) {
//         // 3. Log any unexpected errors during the fetch process
//         console.error("Fetch Error in addToWishList:", error);
//         return { success: false, message: "An unexpected error occurred." };
//     }
// }
// WishListActions/wishList.action.ts
"use server";

import GetMyToken from "@/Utilities/getMyToken";
import { revalidatePath } from "next/cache";

export async function addToWishList(productId: string) {
    const token = await GetMyToken();
    if (!token) {
        return { success: false, message: "You must be logged in." };
    }
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, message: data.message || "Failed to add item." };
        }
        revalidatePath('/wishlist');
        return { success: true, message: data.message, data: data.data };
    } catch (error) {
        console.error("Fetch Error in addToWishList:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

export async function removeFromWishlist(productId: string) {
    const token = await GetMyToken();
    if (!token) {
        return { success: false, message: "You must be logged in." };
    }
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                'token': token,
            },
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, message: data.message || "Failed to remove item." };
        }
        revalidatePath('/wishlist');
        return { success: true, message: data.message };
    } catch (error) {
        console.error("Fetch Error in removeFromWishlist:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}