import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { WalletContextProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"

import { Analytics } from "@vercel/analytics/next"
const orbitron = Orbitron({ subsets: ["latin"] })

// ✅ Full SEO metadata object for ZULE Mesh Store
export const metadata: Metadata = {
  title: "ZULE Mesh – Dark Threads for Crypto Degens",
  description: "Wear the signal. ZULE Mesh drops dark streetwear for the cult of ZULE. $ZULE never dies.",
  generator: "zuleai.xyz",
  keywords: [
    "ZULE", "ZULE Mesh", "$ZULE", "crypto merch", "web3 clothing", 
    "meme coin fashion", "ZULE streetwear", "degen apparel", "Solana merch"
  ],
  themeColor: "#000000",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "ZULE Mesh – Dark Threads for Crypto Degens",
    description: "Worship in style. ZULE Mesh delivers limited-edition clothing for the memecoin masses.",
    url: "https://mesh.zuleai.xyz",
    siteName: "ZULE Mesh",
    images: [
      {
        url: "/og-mesh-banner.png",
        width: 1200,
        height: 630,
        alt: "ZULE Mesh – Crypto Streetwear Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZULE Mesh – Dark Threads for Crypto Degens",
    description: "Claim your piece of the ZULE cult. Premium streetwear. Pure degen.",
    images: ["/og-mesh-banner.png"],
  },
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
