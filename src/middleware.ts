import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//any request user want i will path it first to middleware to check if user is login r not through check token
export async function middleware(request: NextRequest) {
    
    let token = await getToken({ req: request })//return token 
    if (token) {
        if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/register") {
           return NextResponse.redirect(new URL('/', request.url)) 
        } else {
            
            return NextResponse.next()//go to req user want
        }

    }
    
    else {
        if (request.nextUrl.pathname == "/cart") {
            return NextResponse.redirect(new URL('/login', request.url))
            
        } else {
            return NextResponse.next()
        }
        
    }
    
}
//it tells which paths requests go to middleware first
 export const config = {
  matcher:['/cart','/login','/register']
}