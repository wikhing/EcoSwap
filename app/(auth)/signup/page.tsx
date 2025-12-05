'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Signup -> Redirect to Login or Home
    router.push('/login');
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen px-4 py-10"
      style={{ 
        backgroundImage: 'url(/login&signup.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
      }}
    >
      {/* CHANGED: max-w-md (was lg), p-6 (was p-10) */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fade-in-up">
        
        {/* Header with Logo */}
        <div className="text-center mb-5">
          
          {/* Logo and Title Row */}
          <div className="flex items-center justify-center gap-2">
             <div className='relative w-8 h-8'>
                <Image
                src='/ecoswap.png'
                alt='ecoswap logo'
                fill
                className='object-contain'
                />
             </div>
             {/* CHANGED: text-xl (was 2xl) */}
             <h1 className="text-xl font-bold text-gray-800">EcoSwap</h1>
          </div>
          
          <p className='text-[10px] text-gray-500 font-bold tracking-widest mt-0.5 mb-3'>SUSTAINABLE ITEM EXCHANGE</p>

          {/* CHANGED: text-lg (was xl) */}
          <h2 className="text-lg font-bold text-gray-900">Join the Movement</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Create an account to swap, donate, and reduce waste
          </p>
        </div>

        {/* CHANGED: space-y-3 (was space-y-4) */}
        <form onSubmit={handleSignup} className="space-y-3">
          
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">Full Name</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="text" placeholder="e.g. Alexander" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">Student Email</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="email" placeholder="student@um.edu.my" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">Password</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="password" placeholder="Create a strong password" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">Confirm Password</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="password" placeholder="Re-enter password" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none" required />
          </div>

          {/* Pledge Checkbox */}
          <div className="flex items-start gap-2 py-1">
            <input type="checkbox" id="pledge" className="mt-0.5 w-3.5 h-3.5 text-green-700 focus:ring-green-500 border-gray-300 rounded" required />
            <label htmlFor="pledge" className="text-[11px] text-gray-600 leading-tight">
              I agree to the <span className="font-bold text-gray-800">EcoSwap pledge</span> to only trade usable items and respect the campus sustainability guidelines.
            </label>
          </div>

          {/* CHANGED: py-2.5, text-sm */}
          <button 
            type="submit" 
            className="w-full py-2.5 rounded-lg bg-green-800 text-white font-bold text-sm hover:bg-green-700 transition shadow-md mt-1"
          >
            Create Account
          </button>

          <div className="text-center text-xs mt-2">
            <span className="text-gray-500">Already have an account? </span>
            <Link href={"/login"} className='text-green-800 font-bold hover:underline ml-1'>
                Login
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}