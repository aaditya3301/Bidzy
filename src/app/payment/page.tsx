"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  IconCreditCard,
  IconCheck,
  IconShield,
  IconLoader2,
  IconArrowRight,
  IconAlertCircle,
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";

// Bottom gradient effect
const BottomGradient = () => {
  return (
    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-30" />
  );
};

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bidId = searchParams.get("bidId");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bidDetails, setBidDetails] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingBid, setIsLoadingBid] = useState(true);

  const platformFee = 5.99; // Example platform fee in USD

  // Fetch bid details
  useEffect(() => {
    async function fetchBidDetails() {
      if (!bidId) {
        setError("No bid ID provided");
        setIsLoadingBid(false);
        return;
      }

      try {
        const response = await fetch(`/api/bids/${bidId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch bid details");
        }

        const data = await response.json();
        setBidDetails(data.bid);
      } catch (error) {
        console.error("Error fetching bid:", error);
        setError("Failed to load bid details");
      } finally {
        setIsLoadingBid(false);
      }
    }

    fetchBidDetails();
  }, [bidId]);

  // Handle quick payment (demo)
  const handleQuickPay = async () => {
    if (!bidId) {
      toast.error("Bid ID is missing");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Process payment and update bid status
      const response = await fetch(`/api/bids/${bidId}/payment`, {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment failed");
      }

      setShowSuccess(true);
      toast.success(
        "Payment successful! Your shipping request has been published."
      );

      // Redirect after success message
      setTimeout(() => {
        router.push("/your-bid");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Payment processing failed");
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while fetching bid
  if (isLoadingBid) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <IconLoader2 className="w-12 h-12 text-zinc-400 animate-spin" />
          <p className="text-zinc-400 text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !bidDetails) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <IconAlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Link href="/your-bid">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
              Back to Bids
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (showSuccess) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <IconCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful
          </h1>
          <p className="text-zinc-400 mb-6">
            Your shipping request has been published and is now visible to
            carriers.
          </p>
          <div className="w-full bg-zinc-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-zinc-400">Platform Fee:</span>
              <span className="text-white font-medium">
                ${platformFee.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-zinc-700 pt-2 flex justify-between">
              <span className="text-zinc-400">Total Paid:</span>
              <span className="text-white font-medium">
                ${platformFee.toFixed(2)}
              </span>
            </div>
          </div>
          <Link href="/your-bid">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white w-full">
              View Your Bids
              <IconArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Main payment UI
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-bold">
            Bidzy
          </Link>
          <Link
            href="/your-bid"
            className="text-white hover:text-gray-300 transition-colors text-sm flex items-center gap-1"
          >
            <IconArrowLeft className="w-4 h-4" />
            Cancel and return
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl relative">
          <BottomGradient />

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Platform Fee</h1>
            <p className="text-zinc-400">
              Complete payment to publish your shipping request
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-white mb-2">Order Summary</h2>
            {bidDetails && (
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Request ID:</span>
                  <span className="text-zinc-300">
                    {bidDetails.id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400">Title:</span>
                  <span className="text-zinc-300 truncate max-w-[200px]">
                    {bidDetails.title}
                  </span>
                </div>
                <div className="border-t border-zinc-700 mt-2 pt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-zinc-300">Platform Fee:</span>
                    <span className="text-white">
                      ${platformFee.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Demo Payment Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-white">Payment Method</h2>
              <div className="flex items-center">
                <IconShield className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">Secure payment</span>
              </div>
            </div>

            {/* Demo Action (Skipping actual payment for now) */}
            <div className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <IconCreditCard className="w-5 h-5 text-zinc-400 mr-2" />
                <p className="text-zinc-300 text-sm">
                  This is a demo mode. No actual payment will be processed.
                </p>
              </div>

              <Button
                onClick={handleQuickPay}
                disabled={isLoading}
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white"
              >
                {isLoading ? (
                  <>
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay ${platformFee.toFixed(2)} & Publish Request</>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4 mb-6">
              <p className="text-red-500 text-sm flex items-center">
                <IconAlertCircle className="h-4 w-4 mr-2" />
                {error}
              </p>
            </div>
          )}

          <div className="text-center text-xs text-zinc-500">
            <p>
              By proceeding, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
