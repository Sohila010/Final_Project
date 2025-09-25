import NextAuth, {User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface User {//whole object has id user token   return from payload 
        user: {
            name: string,
            email: string,
            role:string
        },
        token:string
    }
  interface Session {
      user: User['user'];
  }
}

declare module "next-auth/jwt" {
    interface JWT extends User { // extends from user as it has user in it 
        idToken?: string
    }
}