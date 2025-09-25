// // app/reset-password/page.jsx
// "use client";

// import { useSession } from "next-auth/react";
// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//     const { data: session } = useSession();
//     const router = useRouter();

//     // State for the new password, loading, and messages
//     const [newPassword, setNewPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!session) {
//             setError("You must be logged in to reset your password.");
//             return;
//         }

//         setIsLoading(true);
//         setMessage('');
//         setError('');

//         try {
//             const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
//                 email: session.user.email,
//                 newPassword: newPassword,
//             });

//             // Assuming the API returns a success message or token
//             setMessage("Password has been reset successfully! You may need to log in again.");
//             // Optionally, you can sign the user out and redirect
//             // signOut({ callbackUrl: "/login" });

//         } catch (err) {
//             setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="container mx-auto p-8 max-w-md">
//             <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={session?.user?.email || ''}
//                         disabled // Email is from session and shouldn't be changed
//                         className="w-full px-3 py-2 border rounded-md bg-gray-100"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
//                     <input
//                         type="password"
//                         id="newPassword"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md"
//                         placeholder="Enter your new password"
//                     />
//                 </div>

//                 {message && <p className="text-green-500 mb-4">{message}</p>}
//                 {error && <p className="text-red-500 mb-4">{error}</p>}

//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 disabled:bg-gray-400"
//                 >
//                     {isLoading ? 'Resetting...' : 'Reset Password'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// "use client";

// import React, { useState } from "react";
// import { toast } from "sonner";

// export default function ResetPasswordPage() {
//     const [email, setEmail] = useState<string>("");
//     const [newPassword, setNewPassword] = useState<string>("");
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();

//         console.log("📤 Sending reset password request...");
//         setIsLoading(true);
//         const toastId = toast.loading("Resetting your password...");

//         try {
//             const response = await fetch(
//                 "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         email: email,
//                         newPassword: newPassword,
//                     }),
//                 }
//             );

//             const data = await response.json();
//             console.log("🔍 API Response:", data);

//             if (!response.ok) {
//                 throw new Error(data.message || "An unknown error occurred.");
//             }

//             toast.success("Password has been reset successfully!", { id: toastId });
//         } catch (error) {
//             const errorMessage =
//                 error instanceof Error ? error.message : "An unexpected error occurred.";
//             console.error("❌ Password reset error:", error);
//             toast.error(errorMessage, { id: toastId });
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-2xl font-bold text-center text-gray-800">
//                     Reset Your Password
//                 </h1>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
//                             placeholder="Enter your email"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                             New Password
//                         </label>
//                         <input
//                             type="password"
//                             id="newPassword"
//                             value={newPassword}
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                                 setNewPassword(e.target.value)
//                             }
//                             required
//                             className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
//                             placeholder="••••••••"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full px-4 py-2 font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-wait"
//                     >
//                         {isLoading ? "Processing..." : "Reset Password"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const router = useRouter()

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    try {
      let res = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword
      })
      if (res.data.token) {
        toast.success("Password reset successfully!")
        router.push("/login")
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed")
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-center text-2xl font-bold my-4">Reset Password</h1>
      <form onSubmit={handleReset}>
        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-4"
          required
        />
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
          Reset Password
        </Button>
      </form>
    </div>
  )
}
