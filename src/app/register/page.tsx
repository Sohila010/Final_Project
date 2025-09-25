"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {  useForm } from 'react-hook-form'
import { fields } from './../../../node_modules/@hookform/resolvers/ajv/src/__tests__/__fixtures__/data';
import { Input } from '@/components/ui/input';
import { type } from './../../../node_modules/swiper/types/modules/public-api.d';
import { Button } from '@/components/ui/button';
import { registerschema, registerSchemaType } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';


export default function Register() {
  let router=useRouter()

let form =  useForm<registerSchemaType>({
  defaultValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone:""
  },resolver:zodResolver(registerschema)
})

  async function handleRegister(values:registerSchemaType) {
    console.log(values);
    //callapi but let make schema first

    try {
      let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    console.log(res);
      if (res.data.message == "success") {
        //toast &login
        toast.success("Register is success", { position: "top-center", duration: 3000 })
        router.push(`/login`)
    }
    } catch (err) {
      // err.response.data.message
      toast.error("Register Failed",{position:"top-center",duration:3000})
   }
    
  }
  
  return <>
    <div className='w-1/2 mx-auto my-12'>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <h1 className='text-center text-2xl font-bold my-4'>Registeration</h1>
  <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel >Name :</FormLabel>
        <FormControl>
         <Input className='mb-3' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
          <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel >Email :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='email' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
          <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel >Password :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='password' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
        />
          <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel >Repassword :</FormLabel>
        <FormControl>
         <Input className='mb-3'  type='password' {...field} />
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
          <Input className='mb-3'  type="tel" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
          />
          
 <Button variant="outline" className='bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer my-4 w-full'>Register</Button>
        
</form>
</Form>


  </div>
  
  
  </>
}
