// "use client"
// // import { createContext, useEffect } from "react"
// import { createContext, useEffect, useState } from "react"
// import { GetMyToken } from '@/Utilities/getMyToken';
// import getLoggedUserCart  from '@/CartActions/getLoggedUserCart.action';

// //this context will bring cart data of logeduser and will loop on count
// export const CartContext = createContext();

// export default function CartContextProvider({ children }) {
//     const [numberOfCartItems, setnumberOfCartItems] = useState(0)
   
//     //i need to have cart of logged user
//     async function getUserCart() {
//         try {
//             let sum=0
//             let res = await getLoggedUserCart()
//             if (res.status == "success") {
//                 console.log(res.data.products);
//                 res.data.products.forEach((product) => {
//                     sum+=product.count
//                 })
//                 setnumberOfCartItems(sum)
                
//             }
//         } catch (err) {
//             console.log("not login");
            
//         }
// }

//     useEffect(() => {
//         getUserCart()
//     },[])





//     return <CartContext.Provider value={{ numberOfCartItems ,setnumberOfCartItems}}>
//         {children}
//     </CartContext.Provider>
// }
"use client";

import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
// import { GetMyToken } from "@/Utilities/getMyToken";
import getLoggedUserCart from "@/CartActions/getLoggedUserCart.action";

// 1️⃣ Define the shape of the context
interface CartContextType {
  numberOfCartItems: number;
  setnumberOfCartItems: Dispatch<SetStateAction<number>>;
}

// 2️⃣ Provide a default value (can be null)
export const CartContext = createContext<CartContextType | undefined>(undefined);

// 3️⃣ Define props for the provider
interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItems, setnumberOfCartItems] = useState<number>(0);

  async function getUserCart() {
    try {
      let sum = 0;
      let res = await getLoggedUserCart();

      if (res.status === "success") {
       // console.log(res.data.products);
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartItems(sum);
      }
    } catch (err) {
      console.log("not login");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
