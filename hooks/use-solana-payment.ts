// --- Solana Payment Hook ---
// src/hooks/use-solana-payment.ts
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

const STORE_WALLET = "3LGAYTsaPW1i6dsYuFr3He5rzLLXugH4bZwMEd9mhq4W";

export const useSolanaPayment = () => {
  const { publicKey, sendTransaction } = useWallet();
  const connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

  const sendSolPayment = async (amountSol: number) => {
    if (!publicKey) throw new Error("Wallet not connected");

    const lamports = amountSol * web3.LAMPORTS_PER_SOL;
    const storePublicKey = new web3.PublicKey(STORE_WALLET);

    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: storePublicKey,
        lamports,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "processed");

    return signature;
  };

  return { sendSolPayment };
};
