"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {  useForm } from 'react-hook-form'
import { fields } from './../../../node_modules/@hookform/resolvers/ajv/src/__tests__/__fixtures__/data';
import { Input } from '@/components/ui/input';
import { type } from './../../../node_modules/swiper/types/modules/public-api.d';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { loginschema, loginSchemaType } from '@/schema/login.schema';
import { signIn} from "next-auth/react"
import Link from 'next/link';


export default function Login() {
  let router=useRouter()

let form =  useForm<loginSchemaType>({
  defaultValues: {
   
    email: "",
    password: "",
   
  },resolver:zodResolver(loginschema)
})

  async function handleRegister(values:loginSchemaType) {
    console.log(values);
    //callapi but let make schema first

  //   try {
  //     let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  //   console.log(res);
  //     if (res.data.message == "success") {
  //       //toast &login
  //       toast.success("Login is success", { position: "top-center", duration: 3000 })
  //       router.push(`/`)
  //   }
  //   } catch (err) {
  //     // err.response.data.message
  //     toast.error("Login Failed",{position:"top-center",duration:3000})
  //  }
    
    //connect login with authorize in auth options
   let response=await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl:"/"
   })
    console.log(response);//error ok
    if (response?.ok) {
      //alert   //go to home but with load for session (i want save some data frm token to session )
      toast.success("Login Successfully",{position:"top-center",duration:2000})
      window.location.href="/"
    } else {
      //alert 
      toast.error(response?.error,{position:"top-center",duration:2000})

}
    
    
  }
  
  return <>
    <div className='w-1/2 mx-auto my-12'>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <h1 className='text-center text-2xl font-bold my-4'>Login</h1>

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
    
   
          
 <Button variant="outline" className='bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer my-4 w-full'>Login</Button>
        
</form>
      </Form>
      <div className="text-center mt-4">
  <Link href="/forgot-password" className="text-blue-600 hover:underline">
    Forgot Password?
  </Link>
</div>


  </div>
  
  
  </>
}
