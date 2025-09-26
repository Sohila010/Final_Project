"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {  useForm } from 'react-hook-form'
import { fields } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation';
import { signIn} from "next-auth/react"
import Link from 'next/link';
import { checkoutschema,checkoutSchemaType } from '@/schema/checkout.schema';
import onlinePayment from '@/checkOutActions/onlinecheckout.action';



export default function Checkout() {
  let {id}:{id:string}=useParams()

  let router=useRouter()

let form =  useForm<checkoutSchemaType>({
  defaultValues: {
   
    details: "",
        phone: "",
    city:""
   
    },
    resolver: zodResolver(checkoutschema)
})

  async function handlecheckout(values:checkoutSchemaType) {
      console.log(values);
      let res= await onlinePayment(id ,"http://localhost:3000/",values)
   

    // console.log(res);
    if (res.status == "success") {
      // console.log(res.session.url);
      window.location.href=res.session.url
      
    }
    
    
  }
  
  return <>
    <div className='w-1/2 mx-auto my-12'>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlecheckout)}>
          <h1 className='text-center text-2xl font-bold my-4'>CheckOut Now</h1>
 <FormField
    control={form.control}
    name="details"
    render={({field}) => (
      <FormItem>
        <FormLabel >Details :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='text' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
     <FormField
    control={form.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel >Phone :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='tel' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
    />
   <FormField
    control={form.control}
    name="city"
    render={({field}) => (
      <FormItem>
        <FormLabel >City :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='text' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
    
   
          
 <Button variant="outline" className='bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer my-4 w-full'>Pay Now</Button>
        
</form>
      </Form>

  </div>
  
  
  </>
}
