import { NextResponse } from "next/server";

/**
 * Transactional Email Dispatch API Route (Unit V)
 * Simulates or dispatches grade notifications via Resend API.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, studentEmail, submissionId, totalPoints, maxPoints, comments } = body;

    if (!studentEmail || !submissionId) {
      return NextResponse.json(
        { success: false, message: "Missing required email dispatch parameters" },
        { status: 400 }
      );
    }

    // Render HTML Email Template
    const emailHtmlPayload = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9f9f9; padding: 20px; }
            .card { background: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 500px; margin: 0 auto; }
            .badge { background: #2d4059; color: #ffffff; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px; }
            .header { color: #1e293b; font-size: 20px; font-weight: bold; margin-bottom: 12px; }
            .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">Grade Published Notice</div>
            <p>Dear <strong>${studentName || "Student"}</strong>,</p>
            <p>Your assignment submission (<code>${submissionId}</code>) has been evaluated by your instructor.</p>
            
            <p style="margin: 20px 0;">
              <strong>Final Grade:</strong> <span class="badge">${totalPoints} / ${maxPoints} pts</span>
            </p>

            <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #334155;">
              <strong>Instructor Feedback:</strong><br/>
              <em>"${comments || "Great effort on this submission!"}"</em>
            </div>

            <div class="footer">
              Sent via Teacher Grading Portal &bull; Resend Transactional Email Engine
            </div>
          </div>
        </body>
      </html>
    `;

    // Simulate Resend API Call (or integrate RESEND_API_KEY if present)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Grading Portal <notifications@resend.dev>",
          to: [studentEmail],
          subject: `[Grade Published] ${studentName} - ${totalPoints}/${maxPoints} pts`,
          html: emailHtmlPayload,
        }),
      });

      const resendData = await resendResponse.json();
      return NextResponse.json({ success: true, message: "Transactional email dispatched via Resend", data: resendData });
    }

    // Mock response when API key is not configured in local environment
    return NextResponse.json({
      success: true,
      message: "Mock transactional email generated successfully",
      preview: { to: studentEmail, subject: `[Grade Published] ${studentName}`, htmlLength: emailHtmlPayload.length },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to dispatch transactional email", error: String(error) },
      { status: 500 }
    );
  }
}
