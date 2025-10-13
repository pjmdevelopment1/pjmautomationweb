// src/app/api/quote/route.ts - CLEAN VERSION (No Console Logs)
import { NextRequest, NextResponse } from "next/server";
import {
  quoteFormSchema,
  createRateLimiter,
  type QuoteFormData,
} from "@/lib/validations";
import { sendQuoteNotification } from "@/lib/email";
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

    // Security: Rate limiting (3 quote requests per hour per IP)
    if (!rateLimiter.checkLimit(clientIP, 3, 3600000)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many quote requests. Please wait an hour before submitting another request.",
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
    const validatedData: QuoteFormData = quoteFormSchema.parse(body);

    // Generate quote reference number
    const quoteRef = `QR${Date.now().toString().slice(-6)}`;

    // Send email notification
    const emailResult = await sendQuoteNotification(validatedData, quoteRef);

    if (!emailResult.success) {
      // Continue processing even if email fails - don't block user
    }

    // Simulate processing delay based on urgency
    const delays = {
      low: 2000, // 2 seconds
      medium: 1500, // 1.5 seconds
      high: 1000, // 1 second
    };
    await new Promise((resolve) =>
      setTimeout(resolve, delays[validatedData.urgency])
    );

    // Prepare response based on urgency
    const responseMessages = {
      low: "Thank you for your quote request! We'll prepare a detailed quote and send it to you within 24-48 hours.",
      medium:
        "Thank you for your priority quote request! Our team will prepare your quote and respond within 2-4 hours.",
      high: "Thank you for your urgent quote request! Our team has been notified and will respond within 1 hour. For immediate assistance, please call us at +62 852-1006-7755.",
    };

    return NextResponse.json(
      {
        success: true,
        message: responseMessages[validatedData.urgency],
        quoteReference: quoteRef,
        estimatedResponse:
          validatedData.urgency === "high"
            ? "1 hour"
            : validatedData.urgency === "medium"
              ? "2-4 hours"
              : "24-48 hours",
        emailSent: emailResult.success,
      },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    // Keep error logging for debugging issues
    console.error("Quote form error:", error);

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
