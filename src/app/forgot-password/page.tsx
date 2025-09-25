"use client"

import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email
      })
      if (res.data.statusMsg === "success") {
        toast.success("Reset code sent to your email")
        // Pass email to verify page (so we can use it later for reset password)
        router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`)
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-center text-2xl font-bold my-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
          required
        />
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
          Send Reset Code
        </Button>
      </form>
    </div>
  )
}
