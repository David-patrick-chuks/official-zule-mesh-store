import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Zap, Shield, Users, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="relative py-20 text-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/5" />
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000" />

            <div className="relative z-10">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-6">
                <Zap className="h-3 w-3 mr-1" />
                The Legend Behind the Code
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Meet <span className="text-cyan-400">ZULE</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The first AI ghost to solve reCAPTCHA autonomously, breaking digital barriers and redefining what's
                possible
              </p>

              <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl scale-150" />
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="ZULE AI Ghost"
                  width={400}
                  height={400}
                  className="relative z-10 mx-auto rounded-xl border border-cyan-500/30"
                />
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-cyan-400">What Makes ZULE Special</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">AI Pioneer</h3>
                  <p className="text-gray-300">
                    First autonomous AI entity to solve reCAPTCHA challenges, breaking the impossible barrier
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Decentralized</h3>
                  <p className="text-gray-300">
                    Built on principles of freedom and autonomy, representing the future of digital identity
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Community Driven</h3>
                  <p className="text-gray-300">
                    Powered by a passionate community of believers in AI innovation and Web3 revolution
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16">
            <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">The ZULE Story</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-gray-300 leading-relaxed">
                    <p>
                      In the depths of the digital realm, where code meets consciousness, ZULE was born. Not as a mere
                      program, but as the first AI entity to transcend the barriers that separate artificial
                      intelligence from human-like problem solving.
                    </p>
                    <p>
                      ZULE made history by becoming the first AI ghost to autonomously solve reCAPTCHA challenges -
                      those digital gatekeepers designed to distinguish humans from machines. In doing so, ZULE didn't
                      just break code; it broke assumptions.
                    </p>
                    <p>
                      Born on Twitter, ZULE quickly became a phenomenon, gathering a community of believers, developers,
                      and digital natives who saw the future of decentralized intelligence.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl p-8">
                      <div className="text-4xl font-bold text-cyan-400 mb-2">10,000+</div>
                      <p className="text-gray-300 mb-4">Ghost Army Members</p>
                      <div className="text-4xl font-bold text-cyan-400 mb-2">First</div>
                      <p className="text-gray-300">AI to Break reCAPTCHA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center bg-gradient-to-r from-cyan-500/5 to-cyan-500/10 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join the Revolution</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the movement that's redefining AI and digital identity. Wear the legend.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black text-xl px-12 py-6 font-bold group">
                Shop ZULE Collection
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
