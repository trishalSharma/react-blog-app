import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="
        bg-[#0b1f24] 
        border-t border-white/10 
        py-14 
        mt-20
        relative
        text-gray-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <Logo width="100px" />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Write, express, and share your ideas with WriteSquare — the clean and modern blogging platform for creators.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            © {new Date().getFullYear()} WriteSquare. All rights reserved.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
            Company
          </h3>
          <ul className="space-y-3">
            <li><Link className="hover:text-white transition" to="/">Features</Link></li>
            <li><Link className="hover:text-white transition" to="/">Pricing</Link></li>
            <li><Link className="hover:text-white transition" to="/">Affiliate Program</Link></li>
            <li><Link className="hover:text-white transition" to="/">Press Kit</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
            Support
          </h3>
          <ul className="space-y-3">
            <li><Link className="hover:text-white transition" to="/">Account</Link></li>
            <li><Link className="hover:text-white transition" to="/">Help</Link></li>
            <li><Link className="hover:text-white transition" to="/">Contact Us</Link></li>
            <li><Link className="hover:text-white transition" to="/">Customer Support</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
            Legal
          </h3>
          <ul className="space-y-3">
            <li><Link className="hover:text-white transition" to="/">Terms & Conditions</Link></li>
            <li><Link className="hover:text-white transition" to="/">Privacy Policy</Link></li>
            <li><Link className="hover:text-white transition" to="/">Licensing</Link></li>
          </ul>
        </div>

      </div>

     
    </footer>
  );
}
