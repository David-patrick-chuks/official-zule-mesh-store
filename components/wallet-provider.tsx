"use client"

import type React from "react"
import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare"
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"

// Import wallet adapter CSS
require("@solana/wallet-adapter-react-ui/styles.css")

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
  // Use a public RPC endpoint that doesn't require authentication
  const endpoint = useMemo(() => "https://api.devnet.solana.com", [])

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new GlowWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
