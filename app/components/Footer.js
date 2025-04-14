"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <p className="text-sm font-body">
            © {new Date().getFullYear()} Best Billing Co. All rights reserved.
          </p>
          <Link className="text-sm font-body hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
