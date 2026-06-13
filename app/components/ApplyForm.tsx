// app/components/ApplyForm.tsx
"use client";

import { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";

// ---------------------------------------------------------------------------
// Validation schema (mirrors API payload)
// ---------------------------------------------------------------------------
const schema = z.object({
  destinations: z
    .array(z.string())
    .min(1, "Select at least one destination")
    .max(6),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
  guests: z
    .number()
    .min(1, "At least one guest")
    .max(20, "Too many guests"),
  budget: z.enum(["10-25", "25-50", "100+"], {
    message: "Select a budget tier",
  }),
  requirements: z.string().optional(),
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone required"),
  country: z.string().min(1, "Country required"),
});

type FormValues = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// UI helpers – options & budget cards
// ---------------------------------------------------------------------------
const destinationOptions = [
  { value: "Red Sea", label: "Red Sea" },
  { value: "Dubai", label: "Dubai" },
  { value: "Yachts", label: "Yachts" },
  { value: "Desert", label: "Desert" },
  { value: "Private Jet", label: "Private Jet" },
  { value: "Hurghada", label: "Hurghada" },
];

const budgetCards = [
  { id: "10-25", label: "$10k – $25k" },
  { id: "25-50", label: "$25k – $50k" },
  { id: "100+", label: "$100k+" },
] as const;

type BudgetTier = (typeof budgetCards)[number]["id"];

export default function ApplyForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 1 },
  });
  const { handleSubmit, trigger, formState, setValue, getValues } = methods;
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleBudgetSelect = (id: BudgetTier) => {
    setValue("budget", id);
  };

  // -----------------------------------------------------------------------
  // Submit – send JSON to our serverless route
  // -----------------------------------------------------------------------
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  const nextStep = async () => {
    const ok = await trigger();
    if (ok) setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  // -----------------------------------------------------------------------
  // Render per‑step UI
  // -----------------------------------------------------------------------
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <label className="block font-body text-lg">Destinations &amp; Interests</label>
            <Controller
              name="destinations"
              control={methods.control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={destinationOptions}
                  classNamePrefix="select"
                  onChange={(val) =>
                    field.onChange(val?.map((v) => v.value) ?? [])
                  }
                />
              )}
            />
            {formState.errors.destinations && (
              <p className="text-champagne text-sm">
                {formState.errors.destinations.message}
              </p>
            )}
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <label className="block font-body text-lg">Travel Dates</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                {...methods.register("startDate")}
                className="rounded px-3 py-2"
              />
              <input
                type="date"
                {...methods.register("endDate")}
                className="rounded px-3 py-2"
              />
            </div>
            <label className="block font-body text-lg">Guests</label>
            <input
              type="number"
              {...methods.register("guests", { valueAsNumber: true })}
              min={1}
              max={20}
              className="w-24 rounded px-3 py-2"
            />
            {formState.errors.guests && (
              <p className="text-champagne text-sm">
                {formState.errors.guests.message}
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <label className="block font-body text-lg">Budget Tier</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetCards.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => handleBudgetSelect(c.id)}
                  className={`border-2 rounded py-4 text-center font-body transition-colors ${
                    getValues("budget") === c.id
                      ? "border-champagne bg-champagne text-obsidian"
                      : "border-alabaster text-alabaster hover:border-champagne"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {formState.errors.budget && (
              <p className="text-champagne text-sm">
                {formState.errors.budget.message}
              </p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <label className="block font-body text-lg">
              Special Requirements / Message
            </label>
            <textarea
              {...methods.register("requirements")}
              rows={4}
              className="w-full rounded px-3 py-2"
              placeholder="Any specific requests…"
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <label className="block font-body text-lg">Your Details</label>
            <input
              type="text"
              placeholder="Full Name"
              {...methods.register("name")}
              className="w-full rounded px-3 py-2"
            />
            {formState.errors.name && (
              <p className="text-champagne text-sm">
                {formState.errors.name.message}
              </p>
            )}
            <input
              type="email"
              placeholder="Email"
              {...methods.register("email")}
              className="w-full rounded px-3 py-2"
            />
            {formState.errors.email && (
              <p className="text-champagne text-sm">
                {formState.errors.email.message}
              </p>
            )}
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              {...methods.register("phone")}
              className="w-full rounded px-3 py-2"
            />
            {formState.errors.phone && (
              <p className="text-champagne text-sm">
                {formState.errors.phone.message}
              </p>
            )}
            <input
              type="text"
              placeholder="Country"
              {...methods.register("country")}
              className="w-full rounded px-3 py-2"
            />
            {formState.errors.country && (
              <p className="text-champagne text-sm">
                {formState.errors.country.message}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // -----------------------------------------------------------------------
  // Success screen (Calendly placeholder)
  // -----------------------------------------------------------------------
  if (submitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-heading mb-4">
          Thank you, we’ll be in touch shortly.
        </h2>
        <p className="mb-6">
          Schedule your consultation below.
        </p>
        <iframe
          src="https://calendly.com/your-calendar?embed_domain=yourdomain.com"
          width="100%"
          height="600"
          frameBorder="0"
        />
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Render form with progress bar
  // -----------------------------------------------------------------------
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Progress bar */}
        <div className="flex justify-center mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                i === step
                  ? "bg-champagne text-obsidian font-heading"
                  : "bg-alabaster text-obsidian"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="border-2 border-champagne text-champagne font-body px-6 py-2 rounded hover:bg-champagne hover:text-obsidian transition-colors"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto border-2 border-champagne text-champagne font-body px-6 py-2 rounded hover:bg-champagne hover:text-obsidian transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto border-2 border-champagne text-champagne font-body px-6 py-2 rounded hover:bg-champagne hover:text-obsidian transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
