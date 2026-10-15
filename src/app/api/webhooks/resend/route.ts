import { NextResponse } from "next/server";

/**
 * Resend Webhook Event Handler Route (Unit V)
 * Processes email delivery events (email.sent, email.delivered, email.bounced, email.opened).
 */
export async function POST(request: Request) {
  try {
    const event = await request.json();

    const { type, data } = event;

    console.log(`📩 [Resend Webhook Event Received]: ${type}`);
    console.log(`Payload:`, JSON.stringify(data, null, 2));

    switch (type) {
      case "email.sent":
        console.log(`✅ Email sent to ${data.to} (ID: ${data.email_id})`);
        break;
      case "email.delivered":
        console.log(`🚀 Email delivered successfully to ${data.to}`);
        break;
      case "email.bounced":
        console.warn(`⚠️ Email bounced for recipient ${data.to}`);
        break;
      case "email.opened":
        console.log(`👁️ Recipient opened email: ${data.to}`);
        break;
      default:
        console.log(`Unhandled webhook event type: ${type}`);
    }

    return NextResponse.json({ received: true, eventType: type });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process webhook event" },
      { status: 500 }
    );
  }
}
