// "use client"
// import { signOut, useSession } from 'next-auth/react'
// import Link from 'next/link'
// import React, { useContext } from 'react'
// import { CartContext } from './../../../context/CartContext';

// export default function Navbar() {
//     let {numberOfCartItems}=useContext(CartContext)
//     //to use session in client =>usesession + sessionProvider make for it a component
//     //status=>"loading/authenticated/unauthenticated"
//     const { data: session, status } = useSession()
//     function logout() {
//         signOut({callbackUrl:"/login"})//delete session for logout and tell u where to go
//     }
//     return <>
//         <nav className='bg-emerald-600 text-white'>
//             <div className="container w-full lg:w-[85%]  mx-auto p-4 flex flex-col lg:flex-row justify-between items-center">
//                 <div className="left">
//                     <ul className='flex gap-2 lg:gap-10 items-center text-[120%]'>
//                     <li className='text-2xl flex' ><Link href="/"><i className='fa-solid fa-cart-shopping'></i>Fresh Cart</Link></li>
//                         <li className='ms-8'><Link href='/'>Home</Link></li>
//                         {session&& <li><Link href='/carts'>Cart</Link></li>}
//                     <li><Link href='/products'>Products</Link></li>
//                     <li><Link href='/categories'>Categories</Link></li>
//                     <li><Link href='/brands'>Brands</Link></li>
//                     <li><Link href='/WishList'>WishList</Link></li>
                    
//                     </ul> 

//             </div>
//                 <div className="right">
//                     <ul className='flex gap-3 items-center'>
//                        {!session ?(<> <li><i className='fab fa-facebook'></i></li>
//                         <li><i className='fab fa-twitter'></i></li>
//                         <li><i className='fab fa-instagram'></i></li>
//                         <li><i className='fab fa-tiktok'></i></li>
//                         <li><i className='fab fa-linkedin'></i></li>
//                         <li><Link href="/register">Register</Link></li>
//                             <li><Link href="/login">Login</Link></li></>
                            
//                        ):(
//                     <>
                        
//                                     <i className="fas fa-shopping-cart text-3xl relative">
//                                         { numberOfCartItems>0&&<span className='absolute top-[-13] start-[14] text-[50%] flex size-5 text-emerald-500 bg-white
//                          rounded-full justify-center items-center'>{ numberOfCartItems}</span>}</i>
//                                     <li><span className='cursor-pointer' onClick={logout}>Signout</span></li>

//                         {session && <li>Hi { session?.user.name}</li>}</>)}


                       
//                     </ul>

//             </div>
            
            
            
            
//             </div> 


//    </nav>
        
//     </>
// }
"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useState } from 'react' // Import useState
import { CartContext } from './../../../context/CartContext';

export default function Navbar() {
    let { numberOfCartItems } = useContext(CartContext);
    const { data: session, status } = useSession();
    
    // State to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function logout() {
        signOut({ callbackUrl: "/login" });
    }

    return <>
        <nav className='bg-emerald-600 text-white'>
            <div className="container w-full lg:w-[85%]  mx-auto p-4 flex flex-col lg:flex-row justify-between items-center">
                <div className="left">
                    <ul className='flex gap-2 lg:gap-10 items-center text-[120%]'>
                        <li className='text-2xl flex' ><Link href="/"><i className='fa-solid fa-cart-shopping'></i>Fresh Cart</Link></li>
                        <li className='ms-8'><Link href='/'>Home</Link></li>
                        {session && <li><Link href='/carts'>Cart</Link></li>}
                        <li><Link href='/products'>Products</Link></li>
                        <li><Link href='/categories'>Categories</Link></li>
                        <li><Link href='/brands'>Brands</Link></li>
                        <li><Link href='/WishList'>WishList</Link></li>
                    </ul>
                </div>
                <div className="right">
                    <ul className='flex gap-3 items-center'>
                        {!session ? (
                            <>
                                <li><i className='fab fa-facebook'></i></li>
                                <li><i className='fab fa-twitter'></i></li>
                                <li><i className='fab fa-instagram'></i></li>
                                <li><i className='fab fa-tiktok'></i></li>
                                <li><i className='fab fa-linkedin'></i></li>
                                <li><Link href="/register">Register</Link></li>
                                <li><Link href="/login">Login</Link></li>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-shopping-cart text-3xl relative">
                                    {numberOfCartItems > 0 && <span className='absolute top-[-13] start-[14] text-[50%] flex size-5 text-emerald-500 bg-white rounded-full justify-center items-center'>{numberOfCartItems}</span>}
                                </i>
                                <li><span className='cursor-pointer' onClick={logout}>Signout</span></li>
                                
                                {/* Dropdown Menu */}
                                {session && (
                                    <li className="relative"> {/* Added relative positioning */}
                                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer">
                                            Hi, {session.user.name}
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                <Link href="/reset-password">
                                                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reset Password</span>
                                                </Link>
                                            </div>
                                        )}
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    </>
}