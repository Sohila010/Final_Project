"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation'
import { checkoutschema, checkoutSchemaType } from '@/schema/checkout.schema'
import cashPayment from '@/checkOutActions/cash.action'


export default function CashCheckout() {
  const { id }: { id: string } = useParams()
  const router = useRouter()

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
    resolver: zodResolver(checkoutschema)
  })

  async function handleCashCheckout(values: checkoutSchemaType) {
    try {
      const res = await cashPayment(id, values)

      if (res.status === "success") {
        toast.success("Order placed successfully! You will pay on delivery.")
        // Redirect to a success page
        router.push('/cash-success')
      } else {
        toast.error(res.message || "Failed to place order. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please check your connection and try again.")
    }
  }

  return (
    <div className='w-1/2 mx-auto my-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCashCheckout)}>
          <h1 className='text-center text-2xl font-bold my-4'>Cash on Delivery</h1>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input className='mb-3' type='text' {...field} placeholder="e.g., Street, Building" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input className='mb-3' type='tel' {...field} placeholder="Your contact number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input className='mb-3' type='text' {...field} placeholder="Your city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="outline"
            className='bg-blue-500 hover:bg-blue-600 text-white cursor-pointer my-4 w-full disabled:bg-slate-400'>
            {form.formState.isSubmitting ? "Placing Order..." : "Confirm Cash Order"}
          </Button>
        </form>
      </Form>
    </div>
  )
}