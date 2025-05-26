"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProduct, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Minus, Plus, Star, Truck, Shield, RotateCcw, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.id)
  const relatedProducts = getRelatedProducts(params.id)
  const { addItem } = useCart()
  const { toast } = useToast()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select both size and color options before adding to cart.",
        variant: "destructive",
      })
      return
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0],
      })
    }

    toast({
      title: "Added to Cart Successfully",
      description: `${quantity}x ${product.name} (${selectedSize}, ${selectedColor}) has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-cyan-400 transition-colors">
                Shop
              </Link>
              <span>/</span>
              <span className="text-cyan-400">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-900 border border-gray-700">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? "border-cyan-400" : "border-gray-700 hover:border-cyan-500/50"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-4">
                  {product.category.toUpperCase()}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-cyan-400">{product.price} SOL</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">(4.9)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>

              {/* Product Options */}
              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-cyan-400">Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 text-sm font-medium rounded-lg border transition-all ${
                          selectedSize === size
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                            : "border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-cyan-400">Color</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 text-sm font-medium rounded-lg border transition-all ${
                          selectedColor === color
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                            : "border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-cyan-400">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-bold w-16 text-center text-white">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black text-lg py-6 font-bold transition-all duration-200 group"
                  size="lg"
                >
                  Add to Ghost Army
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">Free shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">Secure payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">30-day returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-8">Complete Your Ghost Army Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">{relatedProduct.name}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{relatedProduct.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-medium text-cyan-400">{relatedProduct.price} SOL</span>
                        <Link href={`/product/${relatedProduct.id}`}>
                          <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition-all duration-200">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
