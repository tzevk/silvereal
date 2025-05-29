import { NextResponse } from 'next/server';
import { initializeDatabase, addSubscriber } from '../../../utils/db';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log('Received subscription request');

    const dbInitResult = await initializeDatabase();
    if (!dbInitResult) {
      return NextResponse.json(
        { success: false, message: 'Database initialization failed' },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email } = body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const result = await addSubscriber(email);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 400 }
      );
    }

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,       // your email
        pass: process.env.EMAIL_PASS        // your app password (not the Gmail password)
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Subscribing to SILVEREAL ✨',
      html: `
        <div style="font-family:sans-serif;">
          <h2>Welcome to SILVEREAL!</h2>
          <p>Hi there,</p>
          <p>Thank you for subscribing to our newsletter. We’re thrilled to have you on board! 🌟</p>
          <p>You’ll be the first to know about our latest celestial collections and special offers.</p>
          <p>Stay magical,<br/>The SILVEREAL Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Thank you for subscribing! Confirmation email sent.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in subscribe API:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred: ' + error.message },
      { status: 500 }
    );
  }
}