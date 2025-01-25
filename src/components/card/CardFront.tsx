"use client";

import { CardInfo } from "@/app/types/payment";

type CardFrontProps = {
  cardData: CardInfo;
};

export function CardFront({ cardData }: CardFrontProps) {
  return (
    <div className="relative h-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-md">
      <div className="absolute top-4 right-4">
        <svg className="h-8" viewBox="0 0 36 24" fill="none">
          <rect
            width="36"
            height="24"
            rx="4"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M10 16H26M10 12H26M10 8H26" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-12">
        <div className="text-lg tracking-widest font-medium">
          {cardData.cardNumber || "•••• •••• •••• ••••"}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <div className="text-sm font-medium">Card Holder</div>
            <div className="text-sm tracking-wider">
              {cardData.cardHolderName || "YOUR NAME"}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Expires</div>
            <div className="text-sm tracking-wider">
              {cardData.expireMonth || "MM"}/{cardData.expireYear || "YY"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
