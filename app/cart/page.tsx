"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/5" />

            <div className="relative z-10">
              <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-12 w-12 text-cyan-400" />
              </div>

              <h1 className="text-3xl font-bold mb-4 text-white">Your Cart is Empty</h1>
              <p className="text-gray-400 mb-8">Ready to join the ghost army? Start shopping for ZULE merchandise</p>

              <Link href="/shop">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 group">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Your Cart</h1>
            <p className="text-gray-400">
              {items.length} {items.length === 1 ? "item" : "items"} in your ghost army collection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg border border-gray-700"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {item.size}
                          </Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {item.color}
                          </Badge>
                        </div>
                        <p className="text-cyan-400 font-medium text-lg">{item.price} SOL</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 h-8 w-8 ml-4"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-cyan-400">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}-${index}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-300">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-white font-medium">{(item.price * item.quantity).toFixed(3)} SOL</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-6 mb-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-cyan-400">{total.toFixed(3)} SOL</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-6 text-lg group">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="mt-4 text-center">
                    <Link href="/shop" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
