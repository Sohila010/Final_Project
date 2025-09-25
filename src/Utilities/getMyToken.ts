"use server"//to make it just work on server
//anytime i want to use the token call this function 
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetMyToken() {
    try {
        //it will take token from session and decode it  //take token from session
        let encryptedToken = (await cookies()).get(`next-auth.session-token`)?.value || (await cookies()).get(`__Secure-next-auth.session-token`)?.value
        if (!encryptedToken) return null;
        let token = await decode({ token: encryptedToken, secret: process.env.NEXTAUTH_SECRET! })
        console.log(token);
        
        return token?.token || null
    } catch (err) {
        return null
    }
}