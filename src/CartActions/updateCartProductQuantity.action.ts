"use server"

import GetMyToken from "@/Utilities/getMyToken"

export default async function updateProductQuantity(id:string,count:string) {
    const token = await GetMyToken()
    if (!token) throw new Error("login first!!")
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "PUT",
        headers: {
            token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({count})
    
    })
    let payload = await res.json()
    return payload
}