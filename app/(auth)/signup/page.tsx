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
        backgroundImage: 'url(/assets/auth/login&signup.png)', 
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
             <h1 className="text-xl font-bold text-(--black-color)">EcoSwap</h1>
          </div>
          
          <p className='text-[10px] text-(--dark-grey-color) font-bold tracking-widest mt-0.5 mb-3'>SUSTAINABLE ITEM EXCHANGE</p>

          {/* CHANGED: text-lg (was xl) */}
          <h2 className="text-lg font-bold text-(--black-color)">Join the Movement</h2>
          <p className="text-xs text-(--dark-grey-color) mt-0.5">
            Create an account to swap, donate, and reduce waste
          </p>
        </div>

        {/* CHANGED: space-y-3 (was space-y-4) */}
        <form onSubmit={handleSignup} className="space-y-3">
          
          <div>
            <label className="block text-[10px] font-bold text-(--black-color) uppercase mb-1 ml-1">Full Name</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="text" placeholder="e.g. Alexander" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-(--black-color) text-sm placeholder-[#757575] focus:ring-2 focus:ring-(--green-color) focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-(--black-color) uppercase mb-1 ml-1">Student Email</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="email" placeholder="student@siswa.um.edu.my" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-(--black-color) text-sm placeholder-[#757575] focus:ring-2 focus:ring-(--green-color) focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-(--black-color) uppercase mb-1 ml-1">Password</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="password" placeholder="Create a strong password" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-(--black-color) text-sm placeholder-[#757575] focus:ring-2 focus:ring-(--green-color) focus:bg-white outline-none" required />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-(--black-color) uppercase mb-1 ml-1">Confirm Password</label>
            {/* CHANGED: py-2, text-sm */}
            <input type="password" placeholder="Re-enter password" className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-(--black-color) text-sm placeholder-[#757575] focus:ring-2 focus:ring-(--green-color) focus:bg-white outline-none" required />
          </div>

          {/* Pledge Checkbox */}
          <div className="flex items-start gap-2 py-1">
            <div className='relative flex items-center'>
              <input type="checkbox" id="pledge" className="peer appearance-none mt-0.5 w-3.5 h-3.5 text-(--green-color) focus:ring-(--green-color) checked:bg-(--green-color) checked:border-(--green-color) border-2 bg-gray-100 border-gray-300 rounded transition-colors" required />
              <svg className="absolute w-1.5 h-1.5 text-white pointer-events-none hidden peer-checked:block left-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label htmlFor="pledge" className="text-[11px] text-[#757575] leading-tight">
              I agree to the <span className="font-bold text-(--black-color)">EcoSwap pledge</span> to only trade usable items and respect the campus sustainability guidelines.
            </label>
          </div>

          {/* CHANGED: py-2.5, text-sm */}
          <button 
            type="submit" 
            className="w-full py-2.5 rounded-lg bg-(--green-color) text-white font-bold text-sm hover:bg-green-800 transition shadow-md mt-1"
          >
            Create Account
          </button>

          {/* Divider */}
          {/* CHANGED: my-4 (less vertical space) */}
          <div className="mb-4 mt-2 flex items-center justify-center space-x-3">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Or Continue With</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* CHANGED: space-y-2 (tighter gap) */}
          <div className="space-y-2">
              {/* Google Button */}
              {/* CHANGED: py-2 (shorter button), text-sm */}
              <button className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <svg className='block' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Google
              </button>
          </div>
          
          <div className="text-center text-xs mt-2">
            <span className="text-(--dark-grey-color)">Already have an account? </span>
            <Link href={"/login"} className='text-(--green-color) font-bold hover:underline ml-1'>
                Login
            </Link>
          </div>

          

        </form>

      </div>
    </div>
  );
}