'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="bg-[#f4fbf4] min-h-screen flex flex-col items-center justify-center px-4 py-12">
      
      {/* 1. Success Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-green-900 rounded-full flex items-center justify-center shadow-lg animate-fade-in-up">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* 2. Main Headings */}
      <h1 className="text-3xl font-bold text-green-900 mb-3 text-center">
        Item Listed Successfully !
      </h1>
      <p className="text-gray-500 text-sm md:text-base mb-10 text-center">
        Your item is now live and ready to find a second home
      </p>

      {/* 3. Impact Card */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm border-l-4 border-green-700 p-8 text-center mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            IMPACT EARNED
          </h2>
          <div className="text-3xl font-bold text-green-800 mb-2">
            + 50 Green Points
          </div>
          <p className="text-sm text-gray-500">
            Estimated 1.2kg CO2 potential saving
          </p>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-md justify-center">
        <button className="flex-1 bg-green-900 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition shadow-md text-sm">
          View Your Item
        </button>
        <button className="flex-1 bg-white border border-green-700 text-green-800 hover:bg-green-50 font-bold py-3 px-6 rounded-lg transition shadow-sm text-sm">
          Donate Another
        </button>
      </div>

      {/* 5. Return Home Link */}
      <Link href="/" className="text-gray-500 underline decoration-1 underline-offset-4 text-sm hover:text-green-800 mb-10 transition">
        Return home
      </Link>

      {/* 6. Next Steps Box */}
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl p-8 text-center shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 text-sm">Next Steps:</h3>
        <ul className="text-xs md:text-sm text-gray-500 space-y-2">
          <li>• Wait for a student to request or swipe your item</li>
          <li>• Hand over item to complete the swap!</li>
        </ul>
      </div>

    </div>
  );
}