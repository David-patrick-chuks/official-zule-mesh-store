"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  CheckCircle,
  QrCode,
  RefreshCw,
  Eye,
  Clock,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

interface QRPaymentProps {
  total: number;
  orderId: string; // Unique identifier for the order, used to record payment success
  onPaymentSuccess: (reference: string) => void;
  onPaymentCancel: () => void;
}

export function QRPayment({
  total,
  orderId,
  onPaymentSuccess,
  onPaymentCancel,
}: QRPaymentProps) {
  const [qrCode, setQrCode] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "verified" | "error"
  >("pending");
  const [timeLeft, setTimeLeft] = useState(59);
  const { toast } = useToast();

  const generateQR = async () => {
    setLoading(true);
    setPaymentStatus("pending");
    try {
      const response = await fetch(
        "https://solanapay-2r3u.onrender.com/api/payment/qr-live",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total: total,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setReference(data.ref);
      setPaymentStatus("pending");
      setTimeLeft(59);

      toast({
        title: "Payment QR Code Generated",
        description:
          "Please scan the QR code with your Solana wallet to complete your purchase.",
      });
    } catch (error) {
      console.error("Error generating QR:", error);
      toast({
        title: "QR Code Generation Failed",
        description:
          "Unable to generate payment QR code. Please refresh and try again.",
        variant: "destructive",
      });
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    if (!reference) return;
    setTimeLeft(59);
    setVerifying(true);
    try {
      const verifyResponse = await fetch(
        `https://solanapay-2r3u.onrender.com/api/payment/verify?reference=${reference}`
      );

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify payment");
      }

      const verifyData = await verifyResponse.json();

      if (verifyData.status === "verified") {
        // Record payment success and send email
        const successResponse = await fetch(
          "https://solanapay-2r3u.onrender.com/api/payment/success",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference, orderId: orderId }), // Replace with actual orderId
          }
        );

        if (!successResponse.ok) {
          throw new Error("Failed to record payment success");
        }

        const successData = await successResponse.json();
        setPaymentStatus("verified");
        toast({
          title: "Payment Confirmed",
          description:
            "Your transaction has been verified, and a confirmation email has been sent.",
        });
        onPaymentSuccess(reference);
      } else {
        toast({
          title: "Payment Pending",
          description:
            "Transaction not yet confirmed. Please ensure you've completed the payment in your wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast({
        title: "Verification Error",
        description:
          "Unable to verify payment status. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  // Countdown timer for next verification
  useEffect(() => {
    if (reference && paymentStatus === "pending" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, reference, paymentStatus]);

  // Auto-verify every 59 seconds
  useEffect(() => {
    if (reference && paymentStatus === "pending" && timeLeft === 0) {
      verifyPayment();
      setTimeLeft(59); // Reset timer
    }
  }, [timeLeft, reference, paymentStatus]);

  // Generate QR on component mount
  useEffect(() => {
    generateQR();
  }, []);

  if (paymentStatus === "verified") {
    return (
      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Payment Successfully Verified
          </h3>
          <p className="text-green-300 mb-4">
            Your transaction has been confirmed on the Solana blockchain, and a confirmation email has been sent.
          </p>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Transaction Complete
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Header */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/5 border-cyan-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Solana Payment</h3>
                <p className="text-cyan-300">
                  Scan QR code to complete your order
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Amount</p>
              <p className="text-2xl font-bold text-cyan-400">
                {total.toFixed(3)} SOL
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-400 flex items-center justify-between">
            <div className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Payment QR Code
            </div>
            <Badge
              className={`${
                paymentStatus === "pending"
                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  : paymentStatus === "error"
                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                  : "bg-green-500/20 text-green-300 border-green-500/30"
              }`}
            >
              {paymentStatus === "pending"
                ? "Awaiting Payment"
                : paymentStatus === "error"
                ? "Error"
                : "Verified"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code Display */}
          <div className="flex justify-center">
            {loading ? (
              <div className="w-80 h-80 bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">
                    Generating secure payment QR code...
                  </p>
                </div>
              </div>
            ) : qrCode ? (
              <div className="relative group">
                <div className="w-80 h-80 bg-white p-4 rounded-2xl border-2 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
                  <Image
                    src={qrCode || "/placeholder.svg"}
                    alt="Solana Pay QR Code"
                    width={304}
                    height={304}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                {verifying && (
                  <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mx-auto mb-3" />
                      <p className="text-white font-medium">
                        Verifying payment status...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-80 h-80 bg-gray-800/50 rounded-2xl border-2 border-dashed border-red-500/30 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <p className="text-red-300">QR code generation failed</p>
                </div>
              </div>
            )}
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Smartphone className="h-4 w-4 mr-2 text-cyan-400" />
              Payment Instructions
            </h4>
            <ol className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </span>
                Open your Solana wallet app (Phantom, Solflare, etc.)
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </span>
                Scan the QR code above with your wallet
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </span>
                Confirm the transaction for {total.toFixed(3)} SOL
              </li>
              <li className="flex items-start">
                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  4
                </span>
                Wait for blockchain confirmation
              </li>
            </ol>
          </div>

          {/* Timer and Reference */}
          {reference && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">
                    Next verification in
                  </span>
                </div>
                <p className="text-xl font-bold text-white">{timeLeft}s</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <QrCode className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">Reference ID</span>
                </div>
                <p className="text-sm font-mono text-white break-all">
                  {reference.slice(0, 8)}...{reference.slice(-8)}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              onClick={verifyPayment}
              disabled={verifying || !reference}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Verify Payment
                </>
              )}
            </Button>
            <Button
              onClick={generateQR}
              disabled={loading}
              variant="outline"
              className="border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh QR
            </Button>
            <Button
              onClick={onPaymentCancel}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white"
            >
              Cancel Payment
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Payment verification occurs automatically every 59 seconds. You
              can also verify manually at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}