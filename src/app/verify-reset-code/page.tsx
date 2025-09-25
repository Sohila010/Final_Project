"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function VerifyResetCodePage() {
  const [resetCode, setResetCode] = useState("")
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const router = useRouter()

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    try {
      let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode
      })
      if (res.data.status === "Success") {
        toast.success("Code verified!")
        router.push(`/reset-password?email=${encodeURIComponent(email!)}`)
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid reset code")
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-center text-2xl font-bold my-4">Verify Reset Code</h1>
      <form onSubmit={handleVerify}>
        <Input
          type="text"
          placeholder="Enter reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="mb-4"
          required
        />
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
          Verify Code
        </Button>
      </form>
    </div>
  )
}
