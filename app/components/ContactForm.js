"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import { IconUserCircle, IconMailFilled, IconPhoneFilled, IconMessageCircle2 } from "@tabler/icons-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error.message,
      });
    }
  };

  if (formStatus.isSubmitted) {
    return (
      <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
        <p className="font-medium font-sans">Thank you for your request!</p>
        <p className="font-sans">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="block mb-1.5 text-sm font-medium text-neutral-700"
        >
          Name
        </Label>
        <div className="relative">
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="pl-10 h-11 font-body"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <IconUserCircle size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="block mb-1.5 text-sm font-medium text-neutral-700"
        >
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="pl-10 h-11 font-body"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <IconMailFilled size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="block mb-1.5 text-sm font-medium text-neutral-700"
        >
          Phone
        </Label>
        <div className="relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="pl-10 h-11 font-body"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <IconPhoneFilled size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="block mb-1.5 text-sm font-medium text-neutral-700"
        >
          Message
        </Label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-[#0a2351]/20 focus-visible:ring-1 focus-visible:ring-[#0a2351]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 font-body resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={formStatus.isSubmitting}
        className="w-full bg-[#0a2351] text-white hover:translate-y-[2px] px-6 py-3 cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
      >
        {formStatus.isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {formStatus.error && (
        <div className="text-red-500 text-sm mt-2 font-sans">{formStatus.error}</div>
      )}

      <div className="text-xs text-gray-500 mt-4 font-sans">
        This site is protected by reCAPTCHA and the Google
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-600 hover:underline"
        >
          {" "}
          Privacy Policy
        </a>{" "}
        and
        <a
          href="https://policies.google.com/terms"
          className="text-blue-600 hover:underline"
        >
          {" "}
          Terms of Service
        </a>{" "}
        apply.
      </div>
    </form>
  );
}
