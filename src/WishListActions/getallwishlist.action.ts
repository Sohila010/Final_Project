// Add this to your API file, e.g., '@/api/getProducts.api.ts'
import GetMyToken from "@/Utilities/getMyToken";
import { ProductType } from "@/types/Product.type";

export default async function getWishlistProducts(): Promise<ProductType[] | null> {
    const token = await GetMyToken();
    if (!token) {
        return null;
    }
    try {
        // Step 1: Fetch the wishlist items (which are just product IDs)
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'GET',
            headers: {
                'token': token,
            },
            cache: 'no-store' // This is crucial for real-time data
        });

        if (!res.ok) {
            throw new Error('Failed to fetch wishlist');
        }
        
        const data = await res.json();
        const wishlistData = data.data; // The API returns the wishlist items in the 'data' key

        // Step 2: Extract product IDs
        const productIds = wishlistData.map((item: any) => item._id);

        // Step 3: Fetch the full details for each product
        const products: ProductType[] = [];
        for (const productId of productIds) {
            const productRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            if (productRes.ok) {
                const productData = await productRes.json();
                products.push(productData.data);
            }
        }

        return products;

    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return null;
    }
}