import { initiateCheckoutForm } from "@/app/actions/checkout";
import { CheckoutFormInitResponse } from "@/app/types/paymentTypes";
import { CheckoutFormPopup } from "@/components/CheckoutFormPopup";

export default async function CheckoutPopupPage() {
  const result: CheckoutFormInitResponse = await initiateCheckoutForm();

  if (!result || !result.checkoutFormContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="rounded-full h-24 w-24 bg-red-100 mx-auto flex items-center justify-center">
            <svg
              className="h-12 w-12 text-red-600"
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
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Error Initializing Checkout
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Unable to initialize the checkout form. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return <CheckoutFormPopup checkoutFormContent={result.checkoutFormContent} />;
}
