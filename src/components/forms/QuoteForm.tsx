/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/components/forms/QuoteForm.tsx - IMPROVED WITH STEP VALIDATION
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Package,
  Info,
} from "lucide-react";
import { quoteFormSchema, type QuoteFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORIES } from "@/lib/contants";

type FormStatus = "idle" | "loading" | "success" | "error";

const QuoteForm = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [stepErrors, setStepErrors] = useState<{ [key: number]: string[] }>({});
  const searchParams = useSearchParams();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      products: [
        { productId: "", productName: "", quantity: 1, specifications: "" },
      ],
      urgency: "medium",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  // Watch all form values for step validation
  const watchedValues = watch();

  // Pre-fill product if coming from product page
  useEffect(() => {
    const productSlug = searchParams.get("product");
    if (productSlug) {
      setValue("products.0.productName", `Product: ${productSlug}`);
      setValue("products.0.productId", productSlug);
    }
  }, [searchParams, setValue]);

  // Step validation logic
  const validateCurrentStep = async () => {
    let isValid = true;
    const currentErrors: string[] = [];

    if (currentStep === 1) {
      // Step 1: Company Information validation
      const step1Valid = await trigger([
        "companyName",
        "contactPerson",
        "email",
        "phone",
      ]);

      if (!watchedValues.companyName?.trim()) {
        currentErrors.push("Company name is required");
        isValid = false;
      }
      if (!watchedValues.contactPerson?.trim()) {
        currentErrors.push("Contact person is required");
        isValid = false;
      }
      if (!watchedValues.email?.trim()) {
        currentErrors.push("Email is required");
        isValid = false;
      }
      if (!watchedValues.phone?.trim()) {
        currentErrors.push("Phone number is required");
        isValid = false;
      }

      // Check for validation errors from Zod
      if (
        errors.companyName ||
        errors.contactPerson ||
        errors.email ||
        errors.phone
      ) {
        isValid = false;
      }
    }

    if (currentStep === 2) {
      // Step 2: Products validation
      const step2Valid = await trigger(["products"]);

      if (!watchedValues.products || watchedValues.products.length === 0) {
        currentErrors.push("At least one product is required");
        isValid = false;
      } else {
        watchedValues.products.forEach((product, index) => {
          if (!product.productName?.trim()) {
            currentErrors.push(`Product ${index + 1} name is required`);
            isValid = false;
          }
          if (!product.quantity || product.quantity < 1) {
            currentErrors.push(
              `Product ${index + 1} quantity must be at least 1`
            );
            isValid = false;
          }
        });
      }

      // Check for validation errors from Zod
      if (errors.products) {
        isValid = false;
      }
    }

    // Update step errors
    setStepErrors((prev) => ({
      ...prev,
      [currentStep]: currentErrors,
    }));

    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Clear errors when successfully moving to next step
      setStepErrors((prev) => ({
        ...prev,
        [currentStep]: [],
      }));
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setStatus("loading");

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send quote request");
      }

      setStatus("success");
      setSubmitMessage(
        "Thank you! Your quote request has been received. We'll send you a detailed quote within 2 hours."
      );
      reset();
      setCurrentStep(1);
      setStepErrors({});

      // Track successful quote submission
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "quote_request", {
          event_category: "engagement",
          event_label: "quote_form",
          value: data.products.length,
        });
      }
    } catch (error) {
      console.error("Quote form error:", error);
      setStatus("error");
      setSubmitMessage(
        "Sorry, there was an error sending your quote request. Please try again or contact us directly."
      );
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setSubmitMessage("");
    setCurrentStep(1);
    setStepErrors({});
  };

  const urgencyLevel = watch("urgency");

  // Check if current step is valid for button state
  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      return (
        watchedValues.companyName?.trim() &&
        watchedValues.contactPerson?.trim() &&
        watchedValues.email?.trim() &&
        watchedValues.phone?.trim() &&
        !errors.companyName &&
        !errors.contactPerson &&
        !errors.email &&
        !errors.phone
      );
    }

    if (currentStep === 2) {
      return (
        watchedValues.products &&
        watchedValues.products.length > 0 &&
        watchedValues.products.every(
          (product) => product.productName?.trim() && product.quantity > 0
        ) &&
        !errors.products
      );
    }

    return true; // Step 3 has no required fields
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Quote Request Received!
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{submitMessage}</p>
        <div className="space-y-4">
          <Button onClick={resetStatus} className="w-full sm:w-auto">
            Submit Another Quote Request
          </Button>
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              Reference Number: #QR{Date.now().toString().slice(-6)}
            </p>
            <p>
              Need immediate assistance?{" "}
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
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            <div className="ml-3 hidden sm:block">
              <div
                className={`text-sm font-medium ${
                  step <= currentStep ? "text-blue-900" : "text-gray-500"
                }`}
              >
                {step === 1 && "Company Info"}
                {step === 2 && "Product Details"}
                {step === 3 && "Additional Info"}
              </div>
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-0.5 ml-4 ${
                  step < currentStep ? "bg-blue-900" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Company Information */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <div className="border-l-4 border-blue-900 pl-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Company Information
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Tell us about your company and contact details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="companyName" className="text-base font-medium">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="PT. Your Company Name"
                {...register("companyName")}
                className={
                  errors.companyName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.companyName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="contactPerson" className="text-base font-medium">
                Contact Person <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                type="text"
                placeholder="Your full name"
                {...register("contactPerson")}
                className={
                  errors.contactPerson
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.contactPerson && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.contactPerson.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                {...register("email")}
                className={
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                {...register("phone")}
                className={
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Step 1 Validation Errors */}
          {stepErrors[1] && stepErrors[1].length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 mb-2">
                Please fix the following errors:
              </h4>
              <ul className="text-sm text-red-600 space-y-1">
                {stepErrors[1].map((error, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className={
                isCurrentStepValid() ? "" : "opacity-50 cursor-not-allowed"
              }
            >
              Next: Product Details
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Product Details */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div className="border-l-4 border-blue-900 pl-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Requirements
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Add the products you need quotes for
            </p>
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-900" />
                    Product {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor={`products.${index}.productName`}
                      className="text-base font-medium"
                    >
                      Product Name / Model{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g., Mitsubishi FX5U-32MR/ES-A"
                      {...register(`products.${index}.productName` as const)}
                      className={
                        errors.products?.[index]?.productName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    />
                    {errors.products?.[index]?.productName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.products[index]?.productName?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor={`products.${index}.quantity`}
                      className="text-base font-medium"
                    >
                      Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      {...register(`products.${index}.quantity` as const, {
                        valueAsNumber: true,
                      })}
                      className={
                        errors.products?.[index]?.quantity
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    />
                    {errors.products?.[index]?.quantity && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.products[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Label
                    htmlFor={`products.${index}.specifications`}
                    className="text-base font-medium"
                  >
                    Technical Specifications (Optional)
                  </Label>
                  <Textarea
                    placeholder="e.g., 24VDC input, relay output, specific mounting requirements..."
                    rows={3}
                    {...register(`products.${index}.specifications` as const)}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Include voltage, communication protocol, mounting type, or
                    other technical requirements
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  productId: "",
                  productName: "",
                  quantity: 1,
                  specifications: "",
                })
              }
              className="w-full border-dashed border-2 border-gray-300 hover:border-blue-900 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Product
            </Button>
          </div>

          {/* Product Categories Helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-900 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Popular Categories:
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                    <span key={category.slug} className="text-blue-900">
                      • {category.name.split("(")[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 Validation Errors */}
          {stepErrors[2] && stepErrors[2].length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 mb-2">
                Please fix the following errors:
              </h4>
              <ul className="text-sm text-red-600 space-y-1">
                {stepErrors[2].map((error, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentStepValid()}
              className={
                isCurrentStepValid() ? "" : "opacity-50 cursor-not-allowed"
              }
            >
              Next: Additional Info
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Information */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <div className="border-l-4 border-blue-900 pl-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Project details and urgency level
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-medium">
              Project Details / Additional Requirements
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, application, timeline, or any specific requirements..."
              rows={5}
              {...register("message")}
              className={
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.message.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Include application details, installation timeline, or technical
              requirements for better quote accuracy.
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="urgency" className="text-base font-medium">
              Priority Level
            </Label>
            <select
              id="urgency"
              {...register("urgency")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-900 focus:ring-blue-900 p-3 border"
            >
              <option value="low">Low - Standard quote (24-48 hours)</option>
              <option value="medium">
                Medium - Priority quote (2-4 hours)
              </option>
              <option value="high">High - Urgent quote (within 1 hour)</option>
            </select>
            {urgencyLevel === "high" && (
              <p className="mt-2 text-sm text-orange-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                For urgent quotes, consider calling us directly: +62
                852-1006-7755
              </p>
            )}
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

          {/* Submit Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">
              Before you submit:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>
                • We'll respond within the timeframe based on your selected
                priority
              </li>
              <li>
                • Our quotes include technical consultation and parameter
                setting assistance
              </li>
              <li>• All pricing is competitive with quality assurance</li>
              <li>
                • Additional engineering services can be discussed during
                follow-up
              </li>
            </ul>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-950"
              disabled={isSubmitting || status === "loading"}
            >
              {isSubmitting || status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Quote Request...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Quote Request
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;
