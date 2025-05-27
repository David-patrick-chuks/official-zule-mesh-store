"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, MapPin, Calendar, Copy } from "lucide-react"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get("email") || "")
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "")
  const [orderStatus, setOrderStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Auto-track if URL params are present
  useEffect(() => {
    if (email && orderId) {
      handleTrackOrder()
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Tracking information copied to clipboard.",
    })
  }

  const handleTrackOrder = async () => {
    if (!email || !orderId) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and order ID.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `https://solanapay-2r3u.onrender.com/api/tracking?email=${encodeURIComponent(email)}&orderId=${encodeURIComponent(orderId)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setOrderStatus(data)
    } catch (error) {
      console.error("Error tracking order:", error)
      toast({
        title: "Tracking Failed",
        description: "Unable to retrieve order status. Please check your details or try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "order confirmed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "processing":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "shipped":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      case "out for delivery":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-cyan-400" />
    }

    switch (status.toLowerCase()) {
      case "shipped":
      case "out for delivery":
        return <Truck className="h-5 w-5 text-gray-400" />
      default:
        return <Package className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">Track Your Order</h1>
            <p className="text-gray-400">Enter your order details to track your ZULE merchandise</p>
          </div>

          {/* Order Lookup Form */}
          <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-400">Order Lookup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:border-cyan-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="orderId" className="text-gray-300">
                    Order ID
                  </Label>
                  <Input
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white focus:border-cyan-400"
                    placeholder="ZULE123456"
                  />
                </div>
              </div>

              <Button
                onClick={handleTrackOrder}
                disabled={loading || !email || !orderId}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3"
              >
                {loading ? "Tracking..." : "Track Order"}
              </Button>
            </CardContent>
          </Card>

          {/* Order Status Results */}
          {orderStatus && (
            <div className="space-y-8">
              {/* Order Overview */}
              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-bold text-cyan-400 mb-6">Order Overview</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Order ID</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{orderStatus.orderId}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(orderStatus.orderId)}
                              className="h-6 w-6 text-gray-400 hover:text-cyan-400"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400">Tracking Number</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{orderStatus.trackingNumber}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(orderStatus.trackingNumber)}
                              className="h-6 w-6 text-gray-400 hover:text-cyan-400"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400">Order Date</span>
                          <span className="text-white font-medium">{orderStatus.orderDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping Method</span>
                          <span className="text-white font-medium">{orderStatus.shippingMethod}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400">Carrier</span>
                          <span className="text-white font-medium">{orderStatus.carrier}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Status</span>
                          <Badge className={getStatusColor(orderStatus.status)}>
                            {orderStatus.status.charAt(0).toUpperCase() + orderStatus.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-cyan-400 mb-6">Delivery Information</h2>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-cyan-400 mt-1" />
                          <div>
                            <p className="text-white font-medium">Estimated Delivery</p>
                            <p className="text-gray-400">{orderStatus.estimatedDelivery}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-cyan-400 mt-1" />
                          <div>
                            <p className="text-white font-medium">Current Location</p>
                            <p className="text-gray-400">{orderStatus.currentLocation}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Package className="h-5 w-5 text-cyan-400 mt-1" />
                          <div>
                            <p className="text-white font-medium">Items in Package</p>
                            <div className="space-y-1 mt-2">
                              {orderStatus.items.map((item: any, index: number) => (
                                <p key={index} className="text-gray-400 text-sm">
                                  {item.quantity}x {item.name} ({item.size}, {item.color})
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-6">Tracking Timeline</h2>
                  <div className="space-y-6">
                    {orderStatus.timeline.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">{getStatusIcon(step.status, step.completed)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium ${step.completed ? "text-white" : "text-gray-400"}`}>
                              {step.status}
                            </h3>
                            <div className="text-right">
                              <p className={`text-sm ${step.completed ? "text-gray-300" : "text-gray-500"}`}>
                                {step.date}
                              </p>
                              <p className={`text-xs ${step.completed ? "text-gray-400" : "text-gray-600"}`}>
                                {step.time}
                              </p>
                            </div>
                          </div>
                          <p className={`text-sm ${step.completed ? "text-gray-400" : "text-gray-500"}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Actions */}
              <div className="text-center">
                <p className="text-gray-400 mb-4">Need help with your order?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300"
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}