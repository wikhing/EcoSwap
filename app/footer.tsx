
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
            <li><a href="#" className="hover:text-[#81C784]">About Us</a></li>
            <li><a href="#" className="hover:text-[#81C784]">SDG Info</a></li>
            <li><a href="#" className="hover:text-[#81C784]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-white">
            <li><a href="#" className="hover:text-[#81C784]">FAQ</a></li>
            <li><a href="#" className="hover:text-[#81C784]">Safety Guidelines</a></li>
            <li><a href="#" className="hover:text-[#81C784]">Report an Issue</a></li>
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