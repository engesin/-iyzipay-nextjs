"use client";

import { useEffect } from "react";

type CheckoutFormPopupProps = {
  checkoutFormContent: string;
};

export function CheckoutFormPopup({
  checkoutFormContent,
}: CheckoutFormPopupProps) {
  useEffect(() => {
    // Inject the checkout form content into the HTML document
    // const script = checkoutFormContent;
    // script.type = "text/javascript";
    const scriptTagRegex = /<\/?script[^>]*>/g;
    const cs = checkoutFormContent.replace(scriptTagRegex, "");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = cs;
    document.head.appendChild(script);

    // Cleanup the injected script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, [checkoutFormContent]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div id="iyzipay-checkout-form" className="popup"></div>
      </div>
    </div>
  );
}
