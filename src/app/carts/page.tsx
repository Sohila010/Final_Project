"use client"
import deleteCartItems from '@/CartActions/deleteAllItems.action'
import getLoggedUserCart from '@/CartActions/getLoggedUserCart.action'
import removeCartItem from '@/CartActions/removeCartItem.action'
import updateProductQuantity from '@/CartActions/updateCartProductQuantity.action'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext'
import { CartProductType } from '@/types/cart.type'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Carts() {
  const [products, setproducts] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [removedisable, setremovedisable] = useState(false)
  const [updateLoading, setupdateLoading] = useState(false)
  const [currentId, setcurrentId] = useState("")
  let{numberOfCartItems,setnumberOfCartItems}=useContext(CartContext)
  const [totalPrice, settotalPrice] = useState(0)
  const [cartId, setcartId] = useState("")
//will show cart of logged user

  async function getUserCart() {
    try{let res = await getLoggedUserCart()
      if (res.status == "success") {
        //set state of products
        console.log(res.cartId);
        setcartId(res.cartId)
      setisLoading(false)
      setproducts(res.data.products)
      settotalPrice(res.data.totalCartPrice);
      
      }
    } catch (err) {
            setisLoading(false)

    }
    
  }
  
  async function deleteProduct(id: string) {
   setremovedisable(true)
   let res = await removeCartItem(id)
   console.log(res);
   
    if (res.status == "success") {
      ////////
      let sum=0
      res.data.products.forEach((product:CartProductType) => {
        sum+=product.count
      })
      setnumberOfCartItems(sum)
      getUserCart()
//////////
     setremovedisable(false)
     //set array with new products after delete
     setproducts(res.data.products)//this the new array after delete came with response
     toast.success("Product Deleted Successfully",{position:"top-center",duration:2000})
    } else {
           setremovedisable(false)

     toast.error("Can`t Delete This Product",{position:"top-center",duration:2000})
   }
  }



  async function updateProduct(id: string, count: string,sign:string) {
    setcurrentId(id)
setupdateLoading(true)
    setremovedisable(true)
    let res = await updateProductQuantity(id, count)
    console.log(res);
    if (res.status == "success") {
      if (sign == "+") {
        setnumberOfCartItems(numberOfCartItems+1)
      } else if (sign == "-") {
        setnumberOfCartItems(numberOfCartItems-1)
      }
      getUserCart()//to bring data and update total price

      setupdateLoading(false)

      setremovedisable(false)
      //set state to show update
      setproducts(res.data.products)
      toast.success("Quantity Updated Successfully👌",{position:"top-center",duration:2000})
    } else {
            setremovedisable(false)
setupdateLoading(false)

            toast.error("Can`t Update Quantity",{position:"top-center",duration:2000})

    }
    
  }
  async function clear() {
    let res = await deleteCartItems()
    console.log(res);
    if (res.message == "success") {
      //set product empty by calling the getLoggedUser as it will fetch and get cart of user again and find it empty 
      //or se array with []
      setproducts([])
      toast.success("Cart Cleared Successfully",{position:"top-center",duration:2000})
    } else {
            toast.success("Can`t Clear Cart",{position:"top-center",duration:2000})

    }
    
  }

//i want it to show when i open
  useEffect(() => {
  getUserCart()
  }, [])
  

  if (isLoading) {
    return <h1 className='text-center text-3xl font-bold my-12 text-black'>Loading..<i className="fas fa-spinner fa-spin  text-black"></i></h1>
  }


  return <>
    {products?.length > 0 ?
      
      <div className='w-2/3 mx-auto my-12'>
        <div onClick={()=>clear()} className='flex justify-end my-4'><Button className='bg-red-500 hover:bg-red-700 p-4'>Clear Cart Items</Button></div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className='text-center text-3xl text-bold my-4 text-emerald-500 font-bold'>Total Cart Price :{totalPrice }</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
              <th scope="col" className="px-16 py-3">
                Image
             </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {products.map((product:CartProductType)=>  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
          <button
            disabled={removedisable}
            onClick={() => {
              updateProduct(product.product.id, `${product.count - 1}`,"-")
           // setnumberOfCartItems(numberOfCartItems-1)
          }}
            className="inline-flex disabled:bg-slate-400 disabled:rounded-2xl disabled:text-white items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
          <div>
            {product.product.id == currentId ?(
              updateLoading ? (<i className='fas fa-spinner fa-spin'></i>) :
                <span>{product.count}</span>) : (<span>{product.count}</span>
                
              )}
            </div>
          <button
            disabled={removedisable}
            onClick={() => {
              updateProduct(product.product.id, `${product.count + 1}`,"+")
                //setnumberOfCartItems(numberOfCartItems-1)
              }}

            className="inline-flex disabled:bg-slate-400 disabled:rounded-2xl disabled:text-white items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price * product.count}
        </td>
        <td className="px-6 py-4">
        <button disabled={removedisable}
          onClick={() => deleteProduct(product.product._id)}
          className='text-red-500 disabled:bg-slate-400 disabled:rounded-2xl disabled:text-white disabled:p-2 font-semibold cursor-pointer'>Remove</button>
      </td>
      </tr>
     )}
     
    </tbody>
  </table>
</div>
        {/* <Link href={`/checkout/${cartId}`}>
        <Button className='bg-emerald-500 text-white w-full cursor-pointer my-4 p-5 hover:bg-emerald-600'>Check Out Now</Button>
        </Link> */}
        <div className='flex items-center gap-4 mt-4'>
          <Link href={`/checkout/${cartId}`} className='flex-1'>
            <Button className='bg-emerald-500 text-white w-full cursor-pointer p-5 hover:bg-emerald-600'>
              Pay Online Now
            </Button>
          </Link>
          <Link href={`/cash-checkout/${cartId}`} className='flex-1'>
            <Button className='bg-emerald-500 text-white w-full cursor-pointer p-5 hover:bg-emerald-600'>
              Pay with Cash
            </Button>
          </Link>
        </div>
</div>
:<h1 className='text-center text-3xl font-bold my-12 text-red-600'>No Product Added To Cart Yet</h1>} 

  </>
}
