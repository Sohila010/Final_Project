"use client"
import addToCart from '@/CartActions/addToCart.action'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext';
import React, { useContext } from 'react'
import { toast } from 'sonner';

export default function AddBtn({ id }: { id: string }) {
    let{numberOfCartItems,setnumberOfCartItems}=useContext(CartContext)
    
    async function checkAddProduct(id:string) {
        let res = await addToCart(id)
        console.log(res);
        if (res.status === "success") {
            toast.success("Product added successfully 👌", { position: "top-center", description: 2000 })
            setnumberOfCartItems(numberOfCartItems+1)

        } else {
            toast.success(res.message
                , { position: "top-center", description: 2000 })
        }
        
    }

    return <>
    <Button onClick={()=>checkAddProduct(id)} className='cursor-pointer'>Add To Cart</Button>
    </>
}
