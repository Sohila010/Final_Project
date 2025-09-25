"use server"
import GetMyToken from "@/Utilities/getMyToken"

export default async function getLoggedUserCart() {
    
    const token = await GetMyToken()
    if(!token)throw new Error("Can`t Show Your Cart Before Login !!")
  let res= await  fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "GET",
        headers: {
            token,
            "Content-Type":"application/json"
        }
  })
    let payload = res.json();
    return payload;
}