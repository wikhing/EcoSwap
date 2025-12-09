
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--green-color) text-[#81C784] pt-16 pb-6 px-6 md:px-20 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h4 className="font-bold text-lg mb-4">EcoSwap</h4>
          <p className="text-white max-w-xs">
            A sustainable item exchange platform for UM students. Reduce waste, one swap at a time.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white">
            <li><Link href="/about" className="hover:text-[#81C784]">About Us</Link></li>
            <li><Link href="/impact" className="hover:text-[#81C784]">SDG Info</Link></li>
            <li><Link href="/contact" className="hover:text-[#81C784]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-white">
            <li><Link href="/faq" className="hover:text-[#81C784]">FAQ</Link></li>
            <li><Link href="/safety" className="hover:text-[#81C784]">Safety Guidelines</Link></li>
            <li><Link href="/report" className="hover:text-[#81C784]">Report an Issue</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white pt-6 text-center text-xs text-white">
        © 2025 EcoSwap Team 3 Occ 7. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;