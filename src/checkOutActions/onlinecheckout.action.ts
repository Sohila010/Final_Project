"use server"

import { checkoutSchemaType } from "@/schema/checkout.schema"
import GetMyToken from "@/Utilities/getMyToken"

export default async function onlinePayment(cartId:string,url:string,formValues:checkoutSchemaType) {


    const token = await GetMyToken()
    if (!token) throw new Error("login first !!!!")
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        method: "POST",
        headers: {
            token,
            "Content-Type":"application/json"
        }
        , body:JSON.stringify({shippingAddress:formValues})
    })
    let payload = await res.json()
    
    return payload
    
}