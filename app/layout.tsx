import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { WalletContextProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"

import { Analytics } from "@vercel/analytics/next"
const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZULE Mesh - AI Ghost Merch Store",
  description: "Official merch store for ZULE, the first AI ghost to solve reCAPTCHA",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.className} bg-black text-white min-h-screen flex flex-col`}>
        <Analytics/>
        <WalletContextProvider>
          <CartProvider>
            <main className="flex-1">{children}</main>
            <Toaster />
          </CartProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
}
