"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ReviewsSection } from "./components/ReviewsSection";
import { Feature } from "./components/Feature";
import { AnimateOnScroll } from "./components/AnimateOnScroll";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import CenterUnderline from "@/fancy/components/text/underline-center";
import {
  IconFileInvoice,
  IconChartBar,
  IconClipboardList,
  IconChartPie,
  IconShieldCheck,
  IconUserPlus,
  IconReportMoney,
 IconClock, 
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  // State variables for form data
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

  const [captchaToken, setCaptchaToken] = useState(null);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    // Check if script is already loaded
    if (window.grecaptcha) {
      return;
    }

    // Create a global callback function
    window.onRecaptchaLoad = () => {
      console.log("reCAPTCHA loaded successfully");
    };

    // Load the reCAPTCHA v3 script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}&onload=onRecaptchaLoad`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      delete window.onRecaptchaLoad;
    };
  }, []);

  // Execute reCAPTCHA and get token
  const executeRecaptcha = async () => {
    // Wait for grecaptcha to be available
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      // If not available yet, wait a bit and try again
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If still not available, throw error
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        throw new Error(
          "reCAPTCHA not loaded properly. Please refresh the page and try again."
        );
      }
    }

    try {
      return await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit_form" }
      );
    } catch (error) {
      console.error("reCAPTCHA execution error:", error);
      throw new Error(
        "Failed to verify you are not a robot. Please try again."
      );
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha();

      // Send the form data to the API endpoint with the captcha token
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "g-recaptcha-response": token,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API error response:", result);
        throw new Error(result.error || "Failed to send message");
      }

      console.log("Form submission successful:", result);

      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error:
          error.message ||
          "There was an error submitting your request. Please try again.",
      });
    }
  };

  // Function to handle smooth scrolling
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    // If sectionId is 'top', scroll to the top of the page
    if (sectionId === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // Otherwise scroll to the specified section
    const section = document.getElementById(sectionId);
    if (section) {
      // Apply a larger offset for the services section
      const offset = sectionId === "services" ? -30 : 60;
      window.scrollTo({
        top: section.offsetTop - offset, // Adjusted offset
        behavior: "smooth",
      });
    }
  };

  // Services data
  const services = [
    {
      title: "Medical Billing",
      description:
        "Comprehensive medical billing services to ensure timely reimbursements and minimize claim denials.",
      icon: <IconFileInvoice size={24} stroke={1.5} />,
    },
    {
      title: "Revenue Cycle Management",
      description:
        "End-to-end revenue cycle management to optimize your practice's financial performance.",
      icon: <IconChartBar size={24} stroke={1.5} />,
    },
    {
      title: "Claims Processing",
      description:
        "Efficient claims processing and follow-up to maximize collections and reduce outstanding A/R.",
      icon: <IconClipboardList size={24} stroke={1.5} />,
    },
    {
      title: "Payment Posting",
      description:
        "Accurate and timely payment posting to maintain up-to-date financial records for your practice.",
      icon: <IconReportMoney size={24} stroke={1.5} />,
    },
    {
      title: "Compliance Management",
      description:
        "Stay compliant with healthcare regulations and avoid penalties with our compliance management services.",
      icon: <IconShieldCheck size={24} stroke={1.5} />,
    },
    {
      title: "Patient Billing Support",
      description:
        "Provide excellent customer service to patients with questions about their medical bills.",
      icon: <IconUserPlus size={24} stroke={1.5} />,
    },
    {
      title: "Credentialing Services",
      description:
        "Comprehensive provider credentialing and enrollment services with insurance payers to ensure you can bill for your services.",
      icon: <IconClock size={24} stroke={1.5} />,
    },
    {
      title: "Electronic Claims Submission",
      description:
        "Fast and secure electronic claims submission to expedite the reimbursement process.",
      icon: <IconChartPie size={24} stroke={1.5} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-[#0a2351] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto max-w-5xl flex justify-between items-center">
          <Link
            href="#"
            onClick={(e) => scrollToSection(e, "top")}
            className="text-2xl font-bold cursor-pointer "
          >
            Best Billing Co.
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="#services"
              onClick={(e) => scrollToSection(e, "services")}
              className=""
            >
              <CenterUnderline label="Services" />
            </Link>
            <Link
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className=""
            >
              <CenterUnderline label="About Us" />
            </Link>
            <Link
              href="#testimonials"
              onClick={(e) => scrollToSection(e, "testimonials")}
              className=""
            >
              <CenterUnderline label="Testimonials" />
            </Link>
            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className=""
            >
              <CenterUnderline label="Contact" />
            </Link>
          </div>
          <Button
            className="bg-white hover:bg-white text-[#0a2351] hover:translate-y-[2px] px-6 py-3 cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
            onClick={(e) => scrollToSection(e, "contact")}
          >
            Get Started
          </Button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-66px)] flex items-center justify-center py-0 bg-gradient-to-b from-[#0a2351] to-[#1a3a6c] text-white">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center py-20">
          <AnimateOnScroll className="md:w-1/2 mb-10 md:mb-0" direction="left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Medical Billing Solutions
            </h1>
            <p className="text-xl mb-8">
              Maximize your practice&apos;s revenue with our expert medical
              billing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white hover:bg-white text-[#0a2351] hover:translate-y-[2px] px-6 py-3 text-lg cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
                onClick={(e) => scrollToSection(e, "contact")}
              >
                Request a Consultation
              </Button>
              <Button
                className="bg-transparent hover:bg-transparent border-2 border-white hover:translate-y-[2px] text-white px-6 py-3 text-lg transition-all duration-300 cursor-pointer rounded-md shadow-md font-medium"
                onClick={(e) => scrollToSection(e, "services")}
              >
                Learn More
              </Button>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll
            className="md:w-1/2 flex justify-center"
            direction="right"
            delay={0.2}
          >
            <div className="relative w-full max-w-md h-80">
              <Image
                src="/bestbilling.jpg"
                alt="Best Billing Co."
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg shadow-md opacity-95"
                priority
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-[#0a2351] mb-12">
              Our Services
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border rounded-md">
              {services.map((service, index) => (
                <Feature
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-[#0a2351] mb-12">
              About Best Billing Co.
            </h2>
          </AnimateOnScroll>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <AnimateOnScroll className="md:w-1/2" direction="left">
              <p className="text-lg text-gray-700 mb-4">
                Best Billing Co. is a leading medical billing company dedicated
                to helping healthcare providers optimize their revenue cycle and
                focus on patient care.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With over 20 years of experience in the healthcare industry, our
                team of certified billing specialists understands the
                complexities of medical billing and stays up-to-date with the
                latest regulations and coding requirements.
              </p>
              <p className="text-lg text-gray-700">
                We pride ourselves on our attention to detail, personalized
                service, and commitment to maximizing your practice&apos;s
                financial performance.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll className="md:w-1/2" direction="right" delay={0.2}>
              <div className="bg-[#0a2351] text-white p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Experienced team of certified billing specialists",
                    "Customized solutions tailored to your practice's needs",
                    "Transparent reporting and analytics",
                    "Increased collections and reduced denials",
                    "Dedicated account manager for personalized support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <h2 className="text-4xl font-bold text-center mb-16 text-[#0a2351] font-sans">
              What Our Clients Say
            </h2>
          </AnimateOnScroll>

          {/* Featured Testimonials */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="grid md:grid-cols-2 gap-10">
              <AnimateOnScroll delay={0.1}>
                <Card className="p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent>
                    <div className="flex flex-col h-full">
                      <p className="text-gray-700 text-lg mb-6 flex-grow">
                        "Best Billing Co. has transformed our practice's financial
                        performance. Their attention to detail and proactive
                        approach has significantly increased our collections."
                      </p>
                      <div>
                        <div className="font-semibold text-[#0a2351] text-lg">
                          Brian Popovsky, DPT
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Physical Therapy</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2}>
                <Card className="p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent>
                    <div className="flex flex-col h-full">
                      <p className="text-gray-700 text-lg mb-6 flex-grow">
                        "Since partnering with Best Billing Co., we've seen a 30%
                        reduction in claim denials and a 25% increase in revenue.
                        Their team is responsive, professional, and truly cares
                        about our success."
                      </p>
                      <div>
                        <div className="font-semibold text-[#0a2351] text-lg">
                          Mikhail Shapiro, DO
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Physical Medicine and Rehabilitation
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Google Reviews Section */}
          <div className="mt-20">
            <AnimateOnScroll>
              <h3 className="text-3xl font-bold text-center text-[#0a2351] mb-12">
                Our Google Reviews
              </h3>
            </AnimateOnScroll>
            <div className="max-w-7xl mx-auto">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                <ReviewsSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a2351] text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12 font-sans">Contact Us</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimateOnScroll direction="left">
              <h3 className="text-xl font-semibold mb-4 font-sans">Get In Touch</h3>
              <p className="mb-6 font-sans">
                Ready to optimize your medical billing process? Contact us today
                for a free consultation and discover how Best Billing Co. can
                help your practice thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-sans">(718) 332-9592</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-sans">contact@bestbillingnyc.com</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-sans">
                    1307 Gravesend Neck Rd. <br />
                    Brooklyn, NY 11229
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right" delay={0.2}>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#0a2351] mb-4 font-sans">
                  Request a Consultation
                </h3>
                {formStatus.isSubmitted ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
                    <p className="font-medium font-sans">Thank you for your request!</p>
                    <p className="font-sans">We&apos;ll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <ContactForm
                    formData={formData}
                    formStatus={formStatus}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
