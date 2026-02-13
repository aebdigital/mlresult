import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

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

    // Here you would typically send the email using a service like:
    // - Nodemailer
    // - SendGrid
    // - Resend
    // - AWS SES
    //
    // For now, we'll log the data and return success
    // In production, you would configure your email service here

    console.log("Contact form submission:", {
      name,
      email,
      phone: phone || "Not provided",
      message,
      timestamp: new Date().toISOString(),
    });

    // Example with Nodemailer (commented out - needs configuration):
    /*
    import nodemailer from "nodemailer";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "obchod@mlresult.sk",
      subject: `Nova sprava od ${name}`,
      html: `
        <h2>Nova sprava z kontaktneho formulara</h2>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Neuvedene"}</p>
        <p><strong>Sprava:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    return NextResponse.json(
      { success: true, message: "Sprava bola uspesne odoslana" },
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
