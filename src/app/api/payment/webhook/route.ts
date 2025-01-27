import { retrieveCheckoutForm } from "@/lib/actions/checkout";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Extract webhook data
    const {
      iyziEventType,
      iyziEventTime,
      paymentId,
      paymentConversationId,
      iyziReferenceCode,
      status,
    } = data;

    // Validate the webhook status
    if (status === "success") {
      // Cross-validate with checkout form retrieval
      const checkoutResult = await retrieveCheckoutForm(paymentId);

      // Verify payment details match
      if (
        checkoutResult.status === "success" &&
        checkoutResult.paymentId === paymentId &&
        checkoutResult.conversationId === paymentConversationId
      ) {
        // Payment is confirmed - update your database/state here
        console.log("Payment confirmed via webhook:", {
          paymentId,
          eventType: iyziEventType,
          eventTime: iyziEventTime,
          referenceCode: iyziReferenceCode,
        });

        // Here you would typically:
        // 1. Update your database with payment confirmation
        // 2. Send confirmation email to customer
        // 3. Update order status
        // 4. Trigger any other business logic

        // Return 200 to acknowledge receipt
        return new Response(JSON.stringify({ status: "success" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // If validation fails, still return 200 but log the issue
    console.warn("Webhook validation failed:", data);
    return new Response(JSON.stringify({ status: "invalid" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Still return 200 to prevent retries, but log the error
    return new Response(JSON.stringify({ status: "error" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
