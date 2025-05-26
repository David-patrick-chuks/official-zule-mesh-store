// src/hooks/use-solana-payment.ts

import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

const STORE_WALLET = "WBmoukHb1gkawaiyQSLYfGtho4VEEWYzitsN1xEYQrh";
const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=c19acd73-954e-4a71-86f9-0fe7d465004a";

export const useSolanaPayment = () => {
  const { publicKey, wallet } = useWallet();
  const connection = new web3.Connection(HELIUS_RPC_URL, "confirmed");

  const sendSolPayment = async (amountSol: number) => {
    if (!publicKey || !wallet?.adapter) throw new Error("Wallet not connected");

    const lamports = amountSol * web3.LAMPORTS_PER_SOL;
    const storePublicKey = new web3.PublicKey(STORE_WALLET);

    const balance = await connection.getBalance(publicKey);
    // if (balance < lamports) {
    //   throw new Error("Insufficient SOL balance to complete transaction.");
    // }

    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: storePublicKey,
        lamports,
      })
    );

    // Use signAndSendTransaction instead of sendTransaction
    const { signature } = await wallet.adapter.signAndSendTransaction(transaction);

    // Confirm and verify the transaction
    await connection.confirmTransaction(signature, "finalized");

    const result = await connection.getParsedTransaction(signature, { commitment: "finalized" });

    if (!result || result.meta?.err) {
      throw new Error("Transaction failed: " + JSON.stringify(result?.meta?.err));
    }

    return signature;
  };

  return { sendSolPayment };
};
