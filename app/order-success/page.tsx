"use client"

import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Copy, Package, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const txHash = searchParams.get("txHash")
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Transaction hash copied to clipboard.",
    })
  }

  const isDemo = txHash?.startsWith("DEMO")
  const isSol = txHash?.startsWith("SOL")

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Order Confirmed!</h1>
            <p className="text-lg text-gray-300">Welcome to the ghost army! Your ZULE mesh is on its way.</p>
          </div>

          <Card className="bg-gray-900/50 border-gray-700 mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Order ID</p>
                    <p className="text-xl font-bold text-cyan-400">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                    <p className="text-lg font-medium text-white">
                      {isDemo ? "Demo Payment" : isSol ? "Solana (SOL)" : "Cryptocurrency"}
                    </p>
                  </div>
                </div>

                {txHash && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Transaction Hash</p>
                    <div className="flex items-center justify-center space-x-2 bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-mono text-cyan-400 break-all flex-1">{txHash}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(txHash)}
                        className="border-gray-600 hover:border-cyan-400 flex-shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-cyan-400" />
                      <div>
                        <p className="font-medium text-white">Processing</p>
                        <p className="text-sm text-gray-400">Order will be processed within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-cyan-400" />
                      <div>
                        <p className="font-medium text-white">Shipping</p>
                        <p className="text-sm text-gray-400">Free worldwide shipping included</p>
                      </div>
                    </div>
                  </div>
                </div>

                {isDemo && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-300 font-medium">Demo Mode</p>
                    <p className="text-yellow-200 text-sm mt-1">
                      This was a demo transaction. No actual payment was processed.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tracking">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3">Track Your Order</Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 px-8 py-3"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
