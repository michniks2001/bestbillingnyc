"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-[#0a2351]">
            Best Billing Co.
          </Link>
          <Link href="/">
            <Button className="cursor-pointer" variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[#0a2351] mb-8">Privacy Policy</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">Introduction</h2>
            <p className="text-gray-700">
              This Privacy Policy explains how Best Billing Co. ("we," "us," or "our") collects, uses, and shares information about you when you visit our website at bestbillingnyc.com ("Site"). 
              By using our Site, you agree to the collection, use, and sharing of your information as described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">Information We Collect</h2>
            <p className="text-gray-700 mb-3">
              When you use our Site, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Contact Information:</strong> When you submit our contact form, we collect your name, email address, phone number, and any message you provide.</li>
              <li><strong>Usage Information:</strong> We automatically collect information about your interactions with our Site, including the pages you visit and the time spent on each page.</li>
              <li><strong>Device Information:</strong> We may collect information about the device you use to access our Site, including your IP address, browser type, and operating system.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">Cookies and Similar Technologies</h2>
            <p className="text-gray-700 mb-3">
              Our Site uses cookies and similar technologies to enhance your experience and collect information about how you use our Site.
            </p>
            <h3 className="text-lg font-medium text-[#0a2351] mb-2">What are cookies?</h3>
            <p className="text-gray-700 mb-3">
              Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            <h3 className="text-lg font-medium text-[#0a2351] mb-2">Types of cookies we use:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the Site to function properly and cannot be turned off in our systems.</li>
              <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Site.</li>
              <li><strong>Third-Party Cookies:</strong> Our Site uses Google reCAPTCHA to protect our forms from spam and abuse. Google reCAPTCHA sets cookies to help identify and prevent automated submissions.</li>
            </ul>
            <h3 className="text-lg font-medium text-[#0a2351] mt-4 mb-2">Google reCAPTCHA</h3>
            <p className="text-gray-700 mb-3">
              We use Google reCAPTCHA on our Site to protect our forms from spam and automated abuse. Google reCAPTCHA works by collecting hardware and software information, such as device and application data, and sending it to Google for analysis. The information collected in connection with your use of the service will be used to improve reCAPTCHA and for general security purposes. Google does not use this information for personalized advertising.
            </p>
            <p className="text-gray-700">
              By using our contact form, you acknowledge and accept that Google's Privacy Policy (available at <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>) and Terms of Service (available at <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/terms</a>) apply to your use of Google reCAPTCHA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">How to Manage Cookies</h2>
            <p className="text-gray-700 mb-3">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, your overall user experience may be affected, as it will no longer be personalized to you. It may also prevent you from saving customized settings such as login information.
            </p>
            <p className="text-gray-700">
              To learn more about how to manage cookies in your web browser, please visit the following resources:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Privacy Policy or our use of cookies, please contact us at contact@bestbillingnyc.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0a2351] mb-3">Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated Privacy Policy on this page. We recommend that you review this Privacy Policy periodically to stay informed of any changes.
            </p>
            <p className="text-gray-700 mt-3">
              Last updated: April 7, 2025
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a2351] text-white py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p>© {new Date().getFullYear()} Best Billing Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
