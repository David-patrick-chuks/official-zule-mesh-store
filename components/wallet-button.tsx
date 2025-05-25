"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"

export function WalletButton() {
  const { connected, publicKey } = useWallet()

  if (connected && publicKey) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-cyan-400 hidden md:block">{publicKey.toString().substring(0, 8)}...</span>
        <WalletDisconnectButton className="!bg-transparent !border !border-cyan-500/50 !text-white hover:!border-cyan-400 !rounded-md !px-4 !py-2 !text-sm" />
      </div>
    )
  }

  return (
    <WalletMultiButton className="!bg-cyan-500 hover:!bg-cyan-400 !text-black !rounded-md !px-6 !py-2 !font-medium !transition-colors" />
  )
}
