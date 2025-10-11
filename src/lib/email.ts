/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/email.ts - ADD CONTACT EMAIL FUNCTION
import { Resend } from "resend";
import { QuoteFormData, ContactFormData } from "./validations";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResult {
  success: boolean;
  message: string;
  emailId?: string;
}

// EXISTING QUOTE EMAIL FUNCTION (keep as is)
export async function sendQuoteNotification(
  data: QuoteFormData,
  quoteRef: string
): Promise<EmailResult> {
  try {
    const { data: emailResponse, error } = await resend.emails.send({
      from: process.env.QUOTE_EMAIL_FROM || "noreply@pjmotomasi.co.id",
      to: [process.env.QUOTE_EMAIL_TO || "sales@pjmotomasi.co.id"],
      subject: `🔥 NEW QUOTE REQUEST #${quoteRef} - ${data.urgency.toUpperCase()} Priority`,
      html: generateQuoteEmailHtml(data, quoteRef),
      text: generateQuoteEmailText(data, quoteRef),
    });

    if (error) {
      return {
        success: false,
        message: "Failed to send email notification",
      };
    }

    return {
      success: true,
      message: "Quote notification sent successfully",
      emailId: emailResponse?.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "Email service unavailable",
    };
  }
}

// NEW CONTACT EMAIL FUNCTION
export async function sendContactNotification(
  data: ContactFormData
): Promise<EmailResult> {
  try {
    const { data: emailResponse, error } = await resend.emails.send({
      from: process.env.QUOTE_EMAIL_FROM || "noreply@pjmotomasi.co.id",
      to: [process.env.QUOTE_EMAIL_TO || "sales@pjmotomasi.co.id"],
      subject: `💬 NEW CONTACT MESSAGE from ${data.companyName}`,
      html: generateContactEmailHtml(data),
      text: generateContactEmailText(data),
    });

    if (error) {
      return {
        success: false,
        message: "Failed to send email notification",
      };
    }

    return {
      success: true,
      message: "Contact notification sent successfully",
      emailId: emailResponse?.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "Email service unavailable",
    };
  }
}

// EXISTING QUOTE EMAIL TEMPLATES (keep as is)
function generateQuoteEmailHtml(data: QuoteFormData, quoteRef: string): string {
  const urgencyColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  const urgencyBadge = `
    <span style="
      background-color: ${urgencyColors[data.urgency]};
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    ">${data.urgency} Priority</span>
  `;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Quote Request</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">🎯 NEW QUOTE REQUEST</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">Reference: #${quoteRef}</p>
        <div style="margin-top: 15px;">${urgencyBadge}</div>
      </div>

      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #0f766e; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
          👤 Customer Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Company:</td>
            <td style="padding: 8px 0;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Contact Person:</td>
            <td style="padding: 8px 0;">${data.contactPerson}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0f766e;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #0f766e;">${data.phone}</a></td>
          </tr>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #0f766e; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
          📦 Requested Products (${data.products.length} items)
        </h2>
        ${data.products
          .map(
            (product, index) => `
          <div style="background: white; padding: 15px; margin-bottom: 15px; border-radius: 6px; border-left: 4px solid #14b8a6;">
            <h4 style="margin: 0 0 8px 0; color: #374151;">${index + 1}. ${product.productName}</h4>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Quantity:</strong> ${product.quantity}</p>
            ${product.specifications ? `<p style="margin: 5px 0; color: #6b7280;"><strong>Specifications:</strong> ${product.specifications}</p>` : ""}
          </div>
        `
          )
          .join("")}
      </div>

      ${
        data.message
          ? `
      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #0f766e; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
          💬 Additional Message
        </h2>
        <p style="background: white; padding: 15px; border-radius: 6px; margin: 0; line-height: 1.6;">
          ${data.message}
        </p>
      </div>
      `
          : ""
      }

      <div style="background: #0f766e; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">⚡ Quick Actions</h3>
        <div style="margin: 15px 0;">
          <a href="mailto:${data.email}?subject=Quote Response - ${quoteRef}&body=Dear ${data.contactPerson},%0D%0A%0D%0AThank you for your quote request. Here is our detailed quote:%0D%0A%0D%0A" 
             style="background: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
            📧 Reply with Quote
          </a>
          <a href="https://wa.me/${data.phone.replace(/[^\d]/g, "")}?text=Hello ${data.contactPerson}, this is regarding your quote request ${quoteRef}. We have prepared your quote and would like to discuss it with you." 
             style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
            💬 WhatsApp Customer
          </a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px;">
        <p>Quote submitted at: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB</p>
        <p>Response time target: ${data.urgency === "high" ? "1 hour" : data.urgency === "medium" ? "2-4 hours" : "24-48 hours"}</p>
      </div>

    </body>
    </html>
  `;
}

function generateQuoteEmailText(data: QuoteFormData, quoteRef: string): string {
  return `
NEW QUOTE REQUEST - ${quoteRef}

PRIORITY: ${data.urgency.toUpperCase()}

CUSTOMER INFORMATION:
- Company: ${data.companyName}
- Contact: ${data.contactPerson}
- Email: ${data.email}
- Phone: ${data.phone}

REQUESTED PRODUCTS:
${data.products
  .map(
    (product, index) => `
${index + 1}. ${product.productName}
   Quantity: ${product.quantity}${product.specifications ? `\n   Specifications: ${product.specifications}` : ""}
`
  )
  .join("")}

${data.message ? `ADDITIONAL MESSAGE:\n${data.message}\n` : ""}

Response Time Target: ${data.urgency === "high" ? "1 hour" : data.urgency === "medium" ? "2-4 hours" : "24-48 hours"}
Submitted: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB

Reply to: ${data.email}
WhatsApp: ${data.phone}
  `;
}

// NEW CONTACT EMAIL TEMPLATES
function generateContactEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Message</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px;">💬 NEW CONTACT MESSAGE</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">from ${data.companyName}</p>
      </div>

      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #0f766e; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
          👤 Contact Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Company:</td>
            <td style="padding: 8px 0;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Contact Person:</td>
            <td style="padding: 8px 0;">${data.contactPerson}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0f766e;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #0f766e;">${data.phone}</a></td>
          </tr>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #0f766e; margin-top: 0; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">
          💬 Message
        </h2>
        <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #14b8a6;">
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>

      <div style="background: #0f766e; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">⚡ Quick Actions</h3>
        <div style="margin: 15px 0;">
          <a href="mailto:${data.email}?subject=Re: Your inquiry to PJM Otomasi&body=Dear ${data.contactPerson},%0D%0A%0D%0AThank you for contacting us. Here is our response to your inquiry:%0D%0A%0D%0A" 
             style="background: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
            📧 Reply to Customer
          </a>
          <a href="https://wa.me/${data.phone.replace(/[^\d]/g, "")}?text=Hello ${data.contactPerson}, thank you for contacting PJM Otomasi. We have received your message and would like to assist you further." 
             style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
            💬 WhatsApp Customer
          </a>
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px;">
        <p>Message received at: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB</p>
        <p>Expected response time: Within 2 hours during business hours</p>
      </div>

    </body>
    </html>
  `;
}

function generateContactEmailText(data: ContactFormData): string {
  return `
NEW CONTACT MESSAGE

CONTACT INFORMATION:
- Company: ${data.companyName}
- Contact Person: ${data.contactPerson}
- Email: ${data.email}
- Phone: ${data.phone}

MESSAGE:
${data.message}

Received: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB
Expected Response: Within 2 hours during business hours

Reply to: ${data.email}
WhatsApp: ${data.phone}
  `;
}
