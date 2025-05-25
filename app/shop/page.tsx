"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Footer } from "@/components/footer"

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cyan-400">Shop Collection</h1>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-cyan-500"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors group"
              >
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 left-2 bg-cyan-500 text-black">Featured</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-cyan-400">{product.price} SOL</span>
                    <Link href={`/product/${product.id}`}>
                      <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">No products found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
