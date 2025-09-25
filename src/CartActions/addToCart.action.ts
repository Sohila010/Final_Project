"use server"
import GetMyToken from "@/Utilities/getMyToken"
import { error } from "console"

export default async function addToCart(id: string) {
    
    try {
        const token = await GetMyToken()
    if(!token)throw new Error("can`t add to cart before login first !!!")

     let res=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "POST",
        headers: {
            token,
            "Content-Type":"application/json",
         },
         body:JSON.stringify({productId:id})
     })
    let payload = await res.json()
    return payload;
    } catch (err) {
        return err
    }
    
}