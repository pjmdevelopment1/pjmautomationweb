// src/app/api/contact/route.ts - UPDATED WITH EMAIL FUNCTIONALITY
import { NextRequest, NextResponse } from "next/server";
import {
  contactFormSchema,
  createRateLimiter,
  type ContactFormData,
} from "@/lib/validations";
import { sendContactNotification } from "@/lib/email";
import { z } from "zod";
import { headers } from "next/headers";

// Rate limiter instance
const rateLimiter = createRateLimiter();

// Security headers
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
} as const;

export async function POST(request: NextRequest) {
  try {
    // Security: Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIP = headersList.get("x-real-ip");
    const clientIP = forwardedFor?.split(",")[0] || realIP || "unknown";

    // Security: Rate limiting (5 contact messages per hour per IP)
    if (!rateLimiter.checkLimit(clientIP, 5, 3600000)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many contact requests. Please wait an hour before submitting another message.",
        },
        {
          status: 429,
          headers: securityHeaders,
        }
      );
    }

    // Security: Check Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content type",
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    const body = await request.json();

    // Security: Validate and sanitize input
    const validatedData: ContactFormData = contactFormSchema.parse(body);

    // Security: Additional spam check
    if (isSpamSubmission(validatedData)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your message appears to be spam. Please contact us directly if this is an error.",
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    // Send email notification
    const emailResult = await sendContactNotification(validatedData);

    if (!emailResult.success) {
      // Continue processing even if email fails - don't block user
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. We'll contact you within 2 hours during business hours.",
        emailSent: emailResult.success,
      },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    // Keep error logging for debugging issues
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your form data and try again.",
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        {
          status: 400,
          headers: securityHeaders,
        }
      );
    }

    // Don't expose internal errors
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again or contact us directly via WhatsApp.",
      },
      {
        status: 500,
        headers: securityHeaders,
      }
    );
  }
}

// Security: Spam detection
function isSpamSubmission(data: ContactFormData): boolean {
  const spamIndicators = [
    // Check for repeated characters
    /(.)\1{10,}/.test(data.message),

    // Check for excessive caps
    data.message.length > 50 &&
      (data.message.match(/[A-Z]/g) || []).length / data.message.length > 0.5,

    // Check for suspicious patterns
    data.message.toLowerCase().includes("cheap"),
    data.message.toLowerCase().includes("free money"),
    data.companyName.toLowerCase().includes("test"),

    // Check for invalid email patterns
    data.email.includes("+"),
    /\d{4,}/.test(data.email), // emails with long numbers
  ];

  return spamIndicators.filter(Boolean).length >= 2;
}

// CORS and other methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.NODE_ENV === "development"
          ? "*"
          : "https://pjmotomasi.co.id",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...securityHeaders,
    },
  });
}
