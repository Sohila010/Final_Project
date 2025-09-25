"use server"

import GetMyToken from "@/Utilities/getMyToken"

export default async function deleteCartItems() {
    const token = await GetMyToken()
    if (!token) throw new Error("Login First!!!")
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "DELETE",
        headers: {
            token
        }
    })
    let payload = await res.json()
    return payload
    
}