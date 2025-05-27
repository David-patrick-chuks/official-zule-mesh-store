"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { QRPayment } from "@/components/qr-payment"
import { Smartphone, ArrowRight } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const [showQRPayment, setShowQRPayment] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null) // Store orderId from checkout response

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      setError("Please fill in all required fields.")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return false
    }

    return true
  }

  const handleSolPayment = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://solanapay-2r3u.onrender.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, total, items }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const newOrderId = data.orderId
      setOrderId(newOrderId) // Store the orderId from the response
      setShowQRPayment(true)
    } catch (error) {
      console.error("Error during checkout:", error)
      setError(
        error instanceof Error && error.message.includes("400")
          ? "Missing required checkout data."
          : "An error occurred during checkout. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleQRPaymentSuccess = (reference: string) => {
    if (!orderId) {
      console.error("No orderId available for payment success.")
      return
    }

    clearCart()

    toast({
      title: "SOL Payment Successful!",
      description: `Order ${orderId} has been placed successfully.`,
    })

    // router.push(`/payment-success?orderId=${orderId}&txHash=${reference}`)
  }

  const handleQRPaymentCancel = () => {
    setShowQRPayment(false)
  }

  if (showQRPayment) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400 text-center">Complete Payment</h1>
            <QRPayment
              total={total}
              orderId={orderId!} // Pass the stored orderId to QRPayment
              onPaymentSuccess={handleQRPaymentSuccess}
              onPaymentCancel={handleQRPaymentCancel}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400 text-center">Secure Checkout</h1>

          {/* Error Message UI */}
          {error && (
            <Card className="bg-red-500/10 border-red-500/30 mb-8">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Checkout Error</h3>
                <p className="text-red-300">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-red-500/50 text-red-400 hover:border-red-400 hover:text-red-300"
                  onClick={() => setError(null)}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300">
                      State
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-gray-300">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-gray-300">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-600 focus:border-cyan-400 text-white"
                    placeholder="United States"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary & Payment */}
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}-${index}`}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">
                          {item.size}, {item.color} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-cyan-400 font-medium">{(item.price * item.quantity).toFixed(3)} SOL</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-cyan-400">{total.toFixed(3)} SOL</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <Label className="text-cyan-400 mb-3 block">Payment Method</Label>
                  <div className="p-4 rounded-lg border border-cyan-400 bg-cyan-400/10">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-cyan-400" />
                      <div>
                        <p className="font-medium text-white">Pay with SOL (QR Code)</p>
                        <p className="text-sm text-gray-400">Scan QR code with your Solana wallet</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSolPayment}
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black text-lg py-6 font-bold transition-all duration-200 group"
                >
                  {loading ? "Processing..." : "Generate Payment QR Code"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-sm text-gray-400 mt-4 text-center">Secure payment powered by Solana blockchain</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}