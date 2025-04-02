"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  IconFileInvoice, 
  IconChartBar, 
  IconClipboardList, 
  IconReportMoney,
  IconShieldCheck,
  IconUsers,
  IconCertificate,
  IconDeviceLaptop
} from "@tabler/icons-react";
import CenterUnderline from "@/fancy/components/text/underline-center";
import { useState } from "react"


// Custom animation component that animates when scrolled into view
function AnimateOnScroll({ children, className, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const variants = {
    hidden: { 
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Feature component for the services section
const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-[#0a2351]">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#0a2351] transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#0a2351]">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default function Home() {
  // State variables for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    try {
      // console.log("Submitting form data:", formData);
      
      // Send the form data to the API endpoint
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error("API error response:", result);
        throw new Error(result.error || 'Failed to send message');
      }
      
      console.log("Form submission successful:", result);
      
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: error.message || "There was an error submitting your request. Please try again."
      });
    }
  };

  // Function to handle smooth scrolling
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      // Apply a larger offset for the services section
      const offset = sectionId === 'services' ? -30 : 60;
      window.scrollTo({
        top: section.offsetTop - offset, // Adjusted offset
        behavior: "smooth"
      });
    }
  };
  
  // Services data
  const services = [
    {
      title: "Medical Billing",
      description: "Comprehensive medical billing services to ensure timely reimbursements and minimize claim denials.",
      icon: <IconFileInvoice size={24} stroke={1.5} />,
    },
    {
      title: "Revenue Cycle Management",
      description: "End-to-end revenue cycle management to optimize your practice's financial performance.",
      icon: <IconChartBar size={24} stroke={1.5} />,
    },
    {
      title: "Claims Processing",
      description: "Efficient claims processing and follow-up to maximize collections and reduce outstanding A/R.",
      icon: <IconClipboardList size={24} stroke={1.5} />,
    },
    {
      title: "Payment Posting",
      description: "Accurate and timely payment posting to maintain up-to-date financial records for your practice.",
      icon: <IconReportMoney size={24} stroke={1.5} />,
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with healthcare regulations and avoid penalties with our compliance management services.",
      icon: <IconShieldCheck size={24} stroke={1.5} />,
    },
    {
      title: "Patient Billing Support",
      description: "Provide excellent customer service to patients with questions about their medical bills.",
      icon: <IconUsers size={24} stroke={1.5} />,
    },
    {
      title: "Credentialing Services",
      description: "Comprehensive provider credentialing and enrollment services with insurance payers to ensure you can bill for your services.",
      icon: <IconCertificate size={24} stroke={1.5} />,
    },
    {
      title: "Electronic Claims Submission",
      description: "Fast and secure electronic claims submission to expedite the reimbursement process.",
      icon: <IconDeviceLaptop size={24} stroke={1.5} />,
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-[#0a2351] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto max-w-5xl flex justify-between items-center">
          <div className="text-2xl font-bold">Best Billing Co.</div>
          <div className="hidden md:flex space-x-6">
            <a 
              href="#services" 
              onClick={(e) => scrollToSection(e, 'services')}
              className=""
            >
              <CenterUnderline label="Services" />
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className=""
            >
              <CenterUnderline label="About Us" />
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => scrollToSection(e, 'testimonials')}
              className=""
            >
              <CenterUnderline label="Testimonials" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className=""
            >
              <CenterUnderline label="Contact" />
            </a>
          </div>
          <Button 
            className="bg-white hover:bg-white text-[#0a2351] hover:translate-y-[2px] px-6 py-3 cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Get Started
          </Button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-66px)] flex items-center justify-center py-0 bg-gradient-to-b from-[#0a2351] to-[#1a3a6c] text-white">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center py-20">
          <AnimateOnScroll className="md:w-1/2 mb-10 md:mb-0" direction="left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Medical Billing Solutions</h1>
            <p className="text-xl mb-8">Maximize your practice&apos;s revenue with our expert medical billing services.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white hover:bg-white text-[#0a2351] hover:translate-y-[2px] px-6 py-3 text-lg cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
                onClick={(e) => scrollToSection(e, 'contact')}
              >
                Request a Consultation
              </Button>
              <Button 
                className="bg-transparent hover:bg-transparent border-2 border-white hover:translate-y-[2px] text-white px-6 py-3 text-lg transition-all duration-300 cursor-pointer rounded-md shadow-md font-medium"
                onClick={(e) => scrollToSection(e, 'services')}
              >
                Learn More
              </Button>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll className="md:w-1/2 flex justify-center" direction="right" delay={0.2}>
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
            <h2 className="text-3xl font-bold text-center text-[#0a2351] mb-12">Our Services</h2>
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
            <h2 className="text-3xl font-bold text-center text-[#0a2351] mb-12">About Best Billing Co.</h2>
          </AnimateOnScroll>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <AnimateOnScroll className="md:w-1/2" direction="left">
              <p className="text-lg text-gray-700 mb-4">
                Best Billing Co. is a leading medical billing company dedicated to helping healthcare providers optimize their revenue cycle and focus on patient care.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With over 20 years of experience in the healthcare industry, our team of certified billing specialists understands the complexities of medical billing and stays up-to-date with the latest regulations and coding requirements.
              </p>
              <p className="text-lg text-gray-700">
                We pride ourselves on our attention to detail, personalized service, and commitment to maximizing your practice&apos;s financial performance.
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
                    "Dedicated account manager for personalized support"
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
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center text-[#0a2351] mb-12">What Our Clients Say</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Best Billing Co. has transformed our practice's financial performance. Their attention to detail and proactive approach has significantly increased our collections.",
                author: "Brian Popovsky, DPT",
                position: "Physical Therapy"
              },
              {
                quote: "Since partnering with Best Billing Co., we've seen a 30% reduction in claim denials and a 25% increase in revenue. Their team is responsive, professional, and truly cares about our success.",
                author: "Mikhail Shapiro, DO",
                position: "Physical Medicine and Rehabilitation"
              }
            ].map((testimonial, index) => (
              <AnimateOnScroll key={index} delay={index * 0.2} direction={index % 2 === 0 ? "left" : "right"}>
                <Card className="shadow-lg">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                    <div>
                      <p className="font-semibold text-[#0a2351]">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0a2351] text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimateOnScroll direction="left">
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <p className="mb-6">
                Ready to optimize your medical billing process? Contact us today for a free consultation and discover how Best Billing Co. can help your practice thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(718) 332-9592</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@bestbillingnyc.com</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>1307 Gravesend Neck Rd. <br />Brooklyn, NY 11229</span>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right" delay={0.2}>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#0a2351] mb-4">Request a Consultation</h3>
                {formStatus.isSubmitted ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
                    <p className="font-medium">Thank you for your request!</p>
                    <p>We&apos;ll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your Email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Your Phone Number" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        className="w-full min-h-[100px] p-3 border rounded-md"
                        placeholder="Tell us about your practice and needs"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-[#0a2351] hover:bg-[#0a2351] text-white hover:translate-y-[2px] px-6 py-3 w-full cursor-pointer rounded-md shadow-md transition-all duration-300 font-medium"
                      disabled={formStatus.isSubmitting}
                    >
                      {formStatus.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    {formStatus.error && (
                      <div className="text-red-500 text-sm mt-2">
                        {formStatus.error}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <AnimateOnScroll direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="mb-4 md:mb-0">
                <div className="text-xl font-bold text-[#0a2351]">Best Billing Co.</div>
                <p className="text-sm">Professional Medical Billing Services</p>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              &copy; {new Date().getFullYear()} Best Billing Co. All rights reserved.
            </div>
          </AnimateOnScroll>
        </div>
      </footer>
    </div>
  );
}
