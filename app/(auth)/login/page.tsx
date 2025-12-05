'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // MOCK LOGIN: Just redirects to Home
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const handleGuestSignIn = () => {
    router.push('/');
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
      {/* CHANGED: max-w-sm (narrower), p-6 (less padding), shadow-xl (slightly lighter shadow) */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm animate-fade-in-up">
        
        {/* Header Text */}
        {/* CHANGED: mb-6 (less margin), text-2xl (smaller font) */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-xs text-gray-500">
            Log in to track your impact and start swapping.
          </p>
        </div>

        {/* CHANGED: space-y-4 (tighter gap between inputs) */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">
              Email Address
            </label>
            {/* CHANGED: py-2 (shorter input), text-sm */}
            <input 
              type="email" 
              placeholder="student@um.edu.my"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              required 
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1 ml-1">
              Password
            </label>
            {/* CHANGED: py-2 (shorter input), text-sm */}
            <input 
              type="password" 
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              required 
            />
            <div className="text-right mt-1.5">
              <Link href="#" className="text-[10px] font-semibold text-green-700 hover:text-green-800">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          {/* CHANGED: py-2.5 (shorter button), text-base (smaller font) */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-green-800 text-white font-bold text-sm hover:bg-green-700 transition duration-300 shadow-md transform hover:-translate-y-0.5"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        {/* CHANGED: my-4 (less vertical space) */}
        <div className="my-4 flex items-center justify-center space-x-3">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Or Continue With</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* CHANGED: space-y-2 (tighter gap) */}
        <div className="space-y-2">
            {/* Google Button */}
            {/* CHANGED: py-2 (shorter button), text-sm */}
            <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.17v2.98h5.24c-.27 1.67-1.77 2.93-3.24 2.93-2.06 0-3.73-1.67-3.73-3.73s1.67-3.73 3.73-3.73c.96 0 1.84.34 2.53 1l2.12-2.12C17.65 3.39 15.93 2.65 14 2.65c-5.17 0-9.35 4.19-9.35 9.35s4.18 9.35 9.35 9.35c4.71 0 8.74-3.4 9.31-7.98.08-.47.12-.96.12-1.46 0-.49-.08-.96-.15-1.43z"/></svg>
            Google
            </button>

            {/* Guest Button */}
            {/* CHANGED: py-2 (shorter button), text-sm */}
            <button
            onClick={handleGuestSignIn}
            className="w-full py-2 rounded-lg border-2 border-green-700 text-green-700 font-bold text-sm bg-white hover:bg-green-50 transition"
            >
            Sign In as Guest
            </button>
        </div>

        {/* Footer */}
        {/* CHANGED: mt-6 (less margin top) */}
        <div className="mt-6 text-center text-xs text-gray-500">
          New to EcoSwap?{' '}
          <Link href="/signup" className="text-green-800 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}