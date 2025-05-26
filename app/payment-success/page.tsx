"use client"

import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  CheckCircle,
  Copy,
  Package,
  Truck,
  ArrowRight,
  Mail,
  Calendar,
  MapPin,
  CreditCard
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const txHash = searchParams.get("txHash")
  const { toast } = useToast()
  const [orderData, setOrderData] = useState<any>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Information copied to clipboard.",
    })
  }

  const isDemo = txHash?.startsWith("DEMO")
  const isSol = txHash?.startsWith("SOL")

  useEffect(() => {
    if (txHash) {
      const key = `zule-order-${txHash}`
      const stored = localStorage.getItem(key)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setOrderData(parsed)
        } catch (err) {
          console.error("Failed to parse order data:", err)
        }
      }
    }
  }, [txHash])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Loading your order...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/5" />
            <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000" />
            <div className="relative z-10">
              <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="h-12 w-12 text-cyan-400" />
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-4">Payment Successful</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Welcome to the <span className="text-cyan-400">Ghost Army!</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Your ZULE merchandise order has been confirmed. Check your email for detailed order information.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Info */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center">
                  <Package className="h-5 w-5 mr-2" /> Order Information
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Order ID</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{orderData.orderId}</span>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(orderData.orderId)} className="h-6 w-6 text-gray-400 hover:text-cyan-400">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Date</span>
                    <span className="text-white font-medium">{orderData.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Time</span>
                    <span className="text-white font-medium">{orderData.orderTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-white font-medium">
                      {isDemo ? "Demo Payment" : isSol ? "Solana (SOL)" : "Cryptocurrency"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Confirmed</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking Number</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{orderData.trackingNumber}</span>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(orderData.trackingNumber)} className="h-6 w-6 text-gray-400 hover:text-cyan-400">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {txHash && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" /> Transaction Hash
                    </p>
                    <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-mono text-cyan-400 break-all flex-1">{txHash}</p>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(txHash)} className="border-gray-600 hover:border-cyan-400">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center">
                  <Truck className="h-5 w-5 mr-2" /> Shipping & Delivery
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-400">Estimated Delivery</span>
                    </div>
                    <p className="text-white font-medium text-lg">{orderData.estimatedDelivery}</p>
                    <p className="text-sm text-gray-400">7-10 business days</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-400">Shipping Address</span>
                    </div>
                    <div className="text-white text-sm">
                      <p className="font-medium">{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.street}</p>
                      <p>
                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                        {orderData.shippingAddress.zip}
                      </p>
                      <p>{orderData.shippingAddress.country}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-400">Email Confirmation</span>
                    </div>
                    <p className="text-white font-medium">{orderData.customerEmail}</p>
                    <p className="text-sm text-gray-400">Order details sent to your email</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items */}
          <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 mb-8">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-6">Order Items</h2>
              <div className="space-y-4">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-gray-700 last:border-b-0">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-cyan-400">
                        <Badge variant="outline" className="border-cyan-500/30">{item.size}</Badge>
                        <Badge variant="outline" className="border-cyan-500/30">{item.color}</Badge>
                        <span className="text-gray-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-medium">{item.price} SOL</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-6 mt-6 text-white">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{orderData.subtotal.toFixed(3)} SOL</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span className="text-cyan-400">{orderData.total.toFixed(3)} SOL</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Warning */}
          {isDemo && (
            <Card className="bg-yellow-500/10 border-yellow-500/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-yellow-300">Demo Mode Active</h3>
                    <p className="text-yellow-200 text-sm">
                      This was a demo transaction. No actual payment was processed and no items will be shipped.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/tracking?orderId=${orderData.orderId}&email=${orderData.customerEmail}`}>
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 group">
                Track Your Order
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 px-8 py-4">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-4">Need help with your order?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400">
                Contact Support
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400">
                FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
