"use client"

import type React from "react"
import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom"
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare"
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletConnectConnector } from '@walletconnect/web3-provider';

// Import wallet adapter CSS
require("@solana/wallet-adapter-react-ui/styles.css")

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
  // Use a public RPC endpoint that doesn't require authentication
  const endpoint = useMemo(() =>  'https://api.mainnet-beta.solana.com', [])
  
const WALLETCONNECT_RPC = 'https://api.mainnet-beta.solana.com';

    const walletConnectConnector = new WalletConnectConnector({
    rpc: { 101: WALLETCONNECT_RPC },
    qrcode: true,
  });

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new GlowWalletAdapter(), walletConnectConnector], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
