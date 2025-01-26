"use client";

import { useEffect } from "react";

type CheckoutFormPopupProps = {
  checkoutFormContent: string;
};

export function CheckoutFormPopup({
  checkoutFormContent,
}: CheckoutFormPopupProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = checkoutFormContent;
    document.body.appendChild(script);
  }, [checkoutFormContent]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div id="iyzipay-checkout-form" className="popup"></div>
      </div>
    </div>
  );
}
