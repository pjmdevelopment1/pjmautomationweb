// src/components/forms/ContactForm.tsx - ENHANCED SECURITY VERSION
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "loading" | "success" | "error" | "ratelimited";

const ContactForm = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setStatus("loading");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setStatus("ratelimited");
          setSubmitMessage(
            "Too many requests. Please wait a minute before trying again."
          );
        } else {
          throw new Error(result.message || "Failed to send message");
        }
        return;
      }

      setStatus("success");
      setSubmitMessage(
        result.message || "Thank you! Your message has been sent successfully."
      );
      reset();

      // Track successful form submission
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submit", {
          event_category: "engagement",
          event_label: "contact_form",
          value: 1,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again or contact us directly."
      );
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setSubmitMessage("");
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-6">{submitMessage}</p>
        <Button onClick={resetStatus} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  if (status === "ratelimited") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Please Wait
        </h3>
        <p className="text-gray-600 mb-6">{submitMessage}</p>
        <div className="space-y-3">
          <Button onClick={resetStatus} variant="outline">
            Try Again
          </Button>
          <p className="text-sm text-gray-500">
            Need immediate help?{" "}
            <a
              href="https://wa.me/6285210067755"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              WhatsApp us directly
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Security Notice */}
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Shield className="h-4 w-4 text-green-600" />
        <span>
          Your information is protected and will not be shared with third
          parties.
        </span>
      </div>

      {/* Honeypot field (hidden from users, visible to bots) */}
      <input
        type="text"
        name="honeypot"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Company Name */}
      <div>
        <Label htmlFor="companyName">
          Company Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          type="text"
          placeholder="PT. Your Company Name"
          {...register("companyName")}
          className={errors.companyName ? "border-red-500" : ""}
          autoComplete="organization"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Contact Person */}
      <div>
        <Label htmlFor="contactPerson">
          Contact Person <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contactPerson"
          type="text"
          placeholder="Your full name"
          {...register("contactPerson")}
          className={errors.contactPerson ? "border-red-500" : ""}
          autoComplete="name"
        />
        {errors.contactPerson && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.contactPerson.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@company.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+62 812 3456 7890"
          {...register("phone")}
          className={errors.phone ? "border-red-500" : ""}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Describe your automation needs, technical questions, or project requirements..."
          rows={5}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.message.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Include specific product models or technical requirements for faster
          response.
        </p>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {submitMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-950"
        disabled={isSubmitting || status === "loading"}
      >
        {isSubmitting || status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {/* Contact Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Need immediate assistance?{" "}
          <a
            href="tel:+6285210067755"
            className="text-blue-800 hover:text-blue-950 font-medium"
          >
            Call us directly
          </a>{" "}
          or{" "}
          <a
            href="https://wa.me/6285210067755"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            WhatsApp us
          </a>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
