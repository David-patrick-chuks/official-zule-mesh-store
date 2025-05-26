import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { ArrowRight, Zap, Star, Shield, Truck, Award } from "lucide-react"

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
                  <span className="text-white font-medium">10K+ Ghost Army</span>
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
                    className="bg-cyan-500 hover:bg-cyan-400 text-black text-lg px-8 py-4 font-bold group"
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
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-4">Premium Collection</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Wear the <span className="text-cyan-400">Revolution</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Premium ZULE merchandise crafted for the ghost army. Each piece tells the story of digital evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="bg-gray-900/30 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 group backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold">
                        Bestseller
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-2xl font-bold text-cyan-400">{product.price} SOL</span>
                      <Link href={`/product/${product.id}`}>
                        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold transition-all duration-300 shadow-lg shadow-cyan-500/25">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by the <span className="text-cyan-400">Ghost Army</span>
            </h2>
            <p className="text-gray-400 text-lg">Join thousands of AI enthusiasts worldwide</p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "Exceptional quality and design. The ZULE ghost tee has become my go-to for every tech conference. The
                  fabric feels premium and the message is powerful."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">A</span>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-medium">Alex Chen</p>
                    <p className="text-gray-500 text-sm">Senior AI Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "More than just merchandise - it's a statement. Wearing ZULE gear connects me to a community of
                  innovators pushing the boundaries of what's possible."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">S</span>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-medium">Sarah Kim</p>
                    <p className="text-gray-500 text-sm">Blockchain Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black text-xl px-12 py-6 font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/30 transition-all duration-300"
              >
                Join the Revolution
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-cyan-500/5">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="space-y-6">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Stay Connected</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Get Exclusive <span className="text-cyan-400">Updates</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Be the first to know about new drops, exclusive designs, and ZULE community events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none backdrop-blur-sm transition-colors"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-bold px-8 py-4 shadow-lg shadow-cyan-500/25">
                Subscribe
              </Button>
            </div>

            <p className="text-gray-500 text-sm">Join 10,000+ subscribers. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
