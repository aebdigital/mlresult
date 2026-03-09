import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, turnstileToken } = body;

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Chýba overenie Turnstile" },
        { status: 400 }
      );
    }

    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "Overenie zlyhalo. Skúste to znova." },
        { status: 403 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Chybaju povinne udaje" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Neplatny format emailu" },
        { status: 400 }
      );
    }

    // Send email via SMTP2GO API
    const { service } = body;
    const smtpRes = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.SMTP2GO_API_KEY,
        to: [process.env.CONTACT_FORM_RECIPIENT],
        sender: process.env.SMTP2GO_SENDER,
        subject: `Nová správa z webu od ${name}`,
        html_body: `
          <h2>Nová správa z kontaktného formulára</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Meno:</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-mail:</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefón:</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone || "Neuvedené"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Služba:</td><td style="padding:8px;border-bottom:1px solid #eee;">${service || "Neuvedená"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Správa:</td><td style="padding:8px;">${message.replace(/\n/g, "<br>")}</td></tr>
          </table>
          <p style="color:#999;font-size:12px;margin-top:20px;">Odoslané z kontaktného formulára na mlresult.sk</p>
        `,
      }),
    });

    const smtpData = await smtpRes.json();

    if (!smtpRes.ok || smtpData.data?.error) {
      console.error("SMTP2GO error:", smtpData);
      return NextResponse.json(
        { error: "Nepodarilo sa odoslať správu. Skúste to neskôr." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Správa bola úspešne odoslaná" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Nastala chyba pri spracovani spravy" },
      { status: 500 }
    );
  }
}
