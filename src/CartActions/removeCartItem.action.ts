"use server"
import GetMyToken from "@/Utilities/getMyToken"

export default async function removeCartItem(id:string) {
    
    const token = await GetMyToken()
    if(!token)throw new Error("Please Login First !!")

   let res=await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: {
            token,
            "Content-Type":"application/json"
        }
   })
    let payload = res.json()
    return payload
}