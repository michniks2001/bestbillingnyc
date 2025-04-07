"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    
    // Only show banner if they haven't accepted
    if (!cookiesAccepted) {
      // Small delay to prevent flash on initial load
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Cookie Notice:</span> This website uses cookies, including those from Google reCAPTCHA, to enhance your experience and help protect our forms from spam. By continuing to use this site, you consent to our use of cookies in accordance with our{" "}
              <Link 
                href="/privacy-policy" 
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              onClick={acceptCookies}
              className="bg-[#0a2351] hover:bg-[#0a2351] hover:translate-y-[2px] text-white transition-all duration-300 cursor-pointer"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
