//handler that handle when i am login it will call authorize inside options
import { authOptions } from "@/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }