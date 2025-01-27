import { retrieveCheckoutForm } from "@/lib/actions/checkout";
import { CheckoutFormResponse } from "@/types/paymentTypes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get("token") as string;

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result: CheckoutFormResponse = await retrieveCheckoutForm(token);

    if (result.status === "success") {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?type=checkout`
      );
    } else {
      const errorMessage = encodeURIComponent(
        result.errorMessage || "Payment failed"
      );
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error?message=${errorMessage}`
      );
    }
  } catch (error) {
    console.error("Checkout form callback error:", error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error?message=An unexpected error occurred`
    );
  }
}
