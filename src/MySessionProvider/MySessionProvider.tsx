"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

//this component will have sessionprovider
// and it will wrap the application
//children will be all the components
export default function MySessionProvider({children}:{children:React.ReactNode}) {
    return <>
        <SessionProvider>
            
            {children}
    </SessionProvider>
    
    
    </>
}
