// app/api/verify/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { token } = data;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "reCAPTCHA configuration error" },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token with Google
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token
      })
    });

    const recaptchaData = await recaptchaResponse.json();
    
    // Check verification result
    if (!recaptchaData.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "reCAPTCHA verification failed",
          details: recaptchaData['error-codes'] || [] 
        },
        { status: 400 }
      );
    }
    
    // For reCAPTCHA v3, also check the score
    if (recaptchaData.score !== undefined) {
      const score = recaptchaData.score;
      const action = recaptchaData.action;
      
      // Return the score so the client can decide what to do
      return NextResponse.json({
        success: true,
        score,
        action,
        timestamp: recaptchaData.challenge_ts
      });
    }
    
    // For reCAPTCHA v2, just return success
    return NextResponse.json({
      success: true,
      timestamp: recaptchaData.challenge_ts
    });
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { error: "Error verifying reCAPTCHA" },
      { status: 500 }
    );
  }
}