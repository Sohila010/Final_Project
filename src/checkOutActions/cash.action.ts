"use server"

import { checkoutSchemaType } from "@/schema/checkout.schema"
import GetMyToken from "@/Utilities/getMyToken"

export default async function cashPayment(cartId: string, formValues: checkoutSchemaType) {

    const token = await GetMyToken()
    if (!token) throw new Error("Please log in first!")

    try {
        let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ shippingAddress: formValues })
        })
        let payload = await res.json()
        return payload

    } catch (error) {
        // You can handle potential network errors here
        console.error("Cash payment failed:", error);
        return { status: "fail", message: "An unexpected error occurred." };
    }
}