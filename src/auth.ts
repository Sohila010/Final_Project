//config of nextauth
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { json } from "zod";
// import stringify from './../node_modules/uuid/dist/esm-browser/stringify';
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                
            }, authorize: async (Credentials) => {
                let respose = await fetch(`${process.env.APIURL}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: Credentials?.email,
                        password: Credentials?.password
                    }),
                    headers: { "content-type": "application/json" }
                });
                let payload = await respose.json()
                console.log(payload);//it will show the response
                
                // return null
                if (payload.message == "success") {
                    const decodedToken: { id: string } = jwtDecode(payload.token);
                    //in it will be the user down
                    return {
                     id: decodedToken.id,
                      user: payload.user,
                      token: payload.token
                    }

                } else {
                    
                    throw new Error(payload.message || "Wrong Credentials");
                
                }

            }
        })
    ],
    callbacks: {
        //token :encrypted token access from server only 
        //user : came from authorize return of it =>payload object
        async jwt({ token, user }) {
            if (user) {
                token.user = user?.user;
                token.token = user?.token;
            }
            return token//encrypted =>only server
                        //object{user:user,token:token}
        },
        //things will be access in client 
        async session({ session, token }) {
            session.user = token.user;
      return session
    }
        
    }
}