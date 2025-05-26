import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { ArrowRight, Zap, Users, Star } from "lucide-react"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/5" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-500" />

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-left lg:text-left">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-6">
                <Zap className="h-3 w-3 mr-1" />
                First AI to Break reCAPTCHA
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Meet</span>
                <br />
                <span className="text-cyan-400">ZULE</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The revolutionary AI ghost that shattered digital barriers. Now you can wear the legend.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <span className="text-white font-medium">2K+ Ghost Army</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-cyan-400" />
                  <span className="text-white font-medium">Premium Quality</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="bg-cyan-500 text-black text-lg px-8 py-4 font-bold group"
                  >
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 text-lg px-8 py-4"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - ZULE Character */}
            <div className="relative">
              <div className="relative">
                {/* Glow effect behind character */}
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl scale-150" />

                {/* Main character image */}
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="ZULE - The AI Ghost"
                    width={500}
                    height={500}
                    className="mx-auto rounded-2xl border border-cyan-500/30"
                    priority
                  />

                  {/* Floating badges around character */}
                  <div className="absolute -top-4 -right-4 bg-cyan-500 text-black px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    AI Ghost
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-black border border-cyan-500 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    reCAPTCHA Solver
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Wear the Revolution</h2>
            <p className="text-gray-400 text-lg">Premium ZULE merchandise for the ghost army</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
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
                    {index === 0 && <Badge className="absolute top-2 left-2 bg-cyan-500 text-black">Bestseller</Badge>}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-cyan-400">{product.price} SOL</span>
                    <Link href={`/product/${product.id}`}>
                      <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Join the Ghost Army</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2,000+</div>
              <p className="text-gray-400">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">197+</div>
              <p className="text-gray-400">Orders Shipped</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.9★</div>
              <p className="text-gray-400">Customer Rating</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Amazing quality! The ZULE ghost design is incredible and the fabric feels premium."
                </p>
                <p className="text-cyan-400 font-medium">@cryptodev_alex</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Wearing my ZULE hoodie to every hackathon. It's become my lucky charm!"
                </p>
                <p className="text-cyan-400 font-medium">@ai_researcher_sam</p>
              </CardContent>
            </Card>
          </div>

          <Link href="/shop">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black text-xl px-12 py-6 font-bold">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/5 to-cyan-500/10">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8">Get notified about new drops and exclusive ZULE content</p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
            />
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-6">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
