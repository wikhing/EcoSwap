'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '../Input';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (error) {
      setErrors({ email: error.message });
      return;
    }

    router.push('/home');
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      alert(error.message);
    }
  };

  const handleGuestSignIn = () => {
    router.push('/');
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
      {/* CHANGED: max-w-sm (narrower), p-6 (less padding), shadow-xl (slightly lighter shadow) */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm animate-fade-in-up">

        {/* Header Text */}
        {/* CHANGED: mb-6 (less margin), text-2xl (smaller font) */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-(--black-color) mb-1">Welcome Back</h2>
          <p className="text-xs text-(--dark-grey-color)">
            Log in to track your impact and start swapping.
          </p>
        </div>

        {/* CHANGED: space-y-4 (tighter gap between inputs) */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <Input
            label="EMAIL ADDRESS"
            id="loginEmail"
            type="email"
            placeholder="student@um.edu.my"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          {/* Password */}
          <div>
            <Input
              label="PASSWORD"
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <div className="text-right">
              <Link href="#" className="text-[10px] font-semibold text-(--green-color) hover:text-green-700 transition">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          {/* CHANGED: py-2.5 (shorter button), text-base (smaller font) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-(--green-color) text-white font-bold text-sm hover:bg-green-700 transition duration-300 shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
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

        {/* Footer */}
        {/* CHANGED: mt-6 (less margin top) */}
        <div className="mt-6 text-center text-xs text-(--dark-grey-color)">
          New to EcoSwap?{' '}
          <Link href="/signup" className="text-(--green-color) font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}