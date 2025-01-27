import { initiateCheckoutForm } from "@/app/actions/checkout";
import { CheckoutFormInitResponse } from "@/app/types/paymentTypes";
import { CheckoutError } from "@/components/CheckoutError";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CheckoutFormRequestComponent = async () => {
  const result: CheckoutFormInitResponse = await initiateCheckoutForm();
  if (!result || !result.checkoutFormContent) {
    console.log("result", result);
    return (
      <CheckoutError message="Unable to initialize the checkout form. Please try again later." />
    );
  }
  return <CheckoutForm checkoutFormContent={result.checkoutFormContent} />;
};

export default async function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      }
    >
      <CheckoutFormRequestComponent />
    </Suspense>
  );
}
