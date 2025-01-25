"use client";

import { initiatePayment } from "@/app/actions/payment";
import { CardInfo, Currency } from "@/app/types/payment";
import { useState } from "react";
import { CardForm } from "./card/CardForm";
import { CardPreview } from "./card/CardPreview";

export default function PaymentForm() {
  const [cardData, setCardData] = useState<CardInfo | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: CardInfo) => {
    setStatus("loading");
    setError(null);

    try {
      const result = await initiatePayment(formData);
      if (result.status === "success") {
        setStatus("success");
      } else {
        setStatus("error");
        setError(result.errorMessage || "Payment failed");
      }
    } catch (err) {
      setStatus("error");
      setError("An error occurred during payment");
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 sm:p-8">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
          <p className="mt-2 text-base text-gray-700">
            Enter your card details to complete the payment
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
          <div className="order-1 md:order-2">
            <CardPreview
              cardData={
                cardData || {
                  cardHolderName: "",
                  cardNumber: "",
                  expireMonth: "",
                  expireYear: "",
                  cvc: "",
                  price: "",
                  currency: Currency.TRY,
                }
              }
              isFlipped={isCardFlipped}
            />
          </div>
          <div className="order-2 md:order-1">
            <CardForm
              onSubmit={handleSubmit}
              onCVCFocus={() => setIsCardFlipped(true)}
              onCVCBlur={() => setIsCardFlipped(false)}
              isLoading={status === "loading"}
              onCardDataChange={setCardData}
            />
          </div>
        </div>

        {/* Status Messages and Security Info */}
        <div className="max-w-[1000px] mx-auto">
          {status === "success" && (
            <div className="rounded-lg bg-green-100 p-4 text-base font-medium text-green-800">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Payment successful!
              </div>
            </div>
          )}

          {status === "error" && error && (
            <div className="rounded-lg bg-red-100 p-4 text-base font-medium text-red-800">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-700">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m0 0v2m0-2h2m-2 0H8m10-6a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              <span>Your payment is secured with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
