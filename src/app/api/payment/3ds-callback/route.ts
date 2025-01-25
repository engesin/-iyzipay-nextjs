import { complete3DSPayment } from "@/app/actions/payment";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const paymentId = formData.get("paymentId") as string;
    const conversationId = formData.get("conversationId") as string;

    if (!paymentId || !conversationId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await complete3DSPayment(paymentId, conversationId);

    if (result.status === "success") {
      // Redirect to success page
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
      );
    } else {
      // Redirect to error page with error message
      const errorMessage = encodeURIComponent(
        result.errorMessage || "Payment failed"
      );
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error?message=${errorMessage}`
      );
    }
  } catch (error) {
    console.error("3DS callback error:", error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error?message=An unexpected error occurred`
    );
  }
}
