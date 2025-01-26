"use client";

import { useEffect } from "react";

type CheckoutFormProps = {
  checkoutFormContent: string;
};

export function CheckoutForm({ checkoutFormContent }: CheckoutFormProps) {
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
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Checkout Form
        </h1>
        <div id="iyzipay-checkout-form" className="responsive" />
      </div>
    </div>
  );
}
