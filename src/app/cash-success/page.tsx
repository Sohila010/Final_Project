import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CashSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            
            <h1 className="text-4xl font-bold text-emerald-600 mt-6">
                Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-700 mt-4 max-w-md">
                Your order is confirmed. Please prepare the cash amount for payment upon delivery. Thank you for shopping with us!
            </p>
            <Link href="/" className="mt-8">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Continue Shopping
                </Button>
            </Link>
        </div>
    )
}