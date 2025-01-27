"use client";

import { CardBack } from "@/components/card/CardBack";
import { CardFront } from "@/components/card/CardFront";
import { CardInfo } from "@/types/paymentTypes";

type CardPreviewProps = {
  cardData: CardInfo;
  isFlipped: boolean;
};

export function CardPreview({ cardData, isFlipped }: CardPreviewProps) {
  return (
    <div className="h-48 relative perspective-1000 lg:self-center">
      <div
        className={`absolute w-full h-full transition-transform duration-500 preserve-3d ${
          isFlipped ? "rotate-y-180 invisible" : "rotate-y-0 visible"
        }`}
      >
        <CardFront cardData={cardData} />
      </div>

      <div
        className={`absolute w-full h-full transition-transform duration-500 preserve-3d ${
          isFlipped ? "rotate-y-0 visible" : "rotate-y-180 invisible"
        }`}
      >
        <CardBack cvc={cardData.cvc} />
      </div>
    </div>
  );
}
