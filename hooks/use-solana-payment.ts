// --- Solana Payment Hook ---
// src/hooks/use-solana-payment.ts
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

const STORE_WALLET = "3LGAYTsaPW1i6dsYuFr3He5rzLLXugH4bZwMEd9mhq4W";
// ✅ Use Helius RPC
const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=c19acd73-954e-4a71-86f9-0fe7d465004a";

export const useSolanaPayment = () => {
    const { publicKey, sendTransaction } = useWallet();
    const connection = new web3.Connection(HELIUS_RPC_URL, "confirmed"); // you can use 'confirmed' or 'processed'

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
