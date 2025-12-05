'use server';

import { redirect } from 'next/navigation';

// ----------------------------------------------------------------
// Shared Validation Utilities (In a real app, this would be more robust)
// ----------------------------------------------------------------

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface FormState {
  message: string;
}

// ----------------------------------------------------------------
// Login Action
// ----------------------------------------------------------------

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // Simulate network delay
  await sleep(1500);

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { message: 'Email and password are required.' };
  }

  // TODO: Replace with your actual database/authentication logic
  console.log('Server received login attempt:', { email, password });

  if (email === 'test@ecoswap.com' && password === 'password123') {
    // In a real application, you would set an authentication cookie here (e.g., using NextAuth.js or manually)
    console.log('Login successful! Setting session...');
    
    // Redirect the user to the profile page after successful login
    redirect('/profile'); 
    
  } else {
    // If login fails
    return { message: 'Login failed. Invalid email or password.' };
  }
}

// ----------------------------------------------------------------
// Sign Up Action
// ----------------------------------------------------------------

export async function signupAction(prevState: FormState, formData: FormData): Promise<FormState> {
  // Simulate network delay
  await sleep(1500);

  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const agreePledge = formData.get('agreePledge');

  if (!fullName || !email || !password || !confirmPassword) {
    return { message: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { message: 'Passwords do not match.' };
  }

  if (!agreePledge) {
    return { message: 'You must agree to the EcoSwap pledge.' };
  }

  // TODO: Replace with your actual database interaction (e.g., hash password, create user record)
  console.log('Server received sign up:', { fullName, email });
  
  // After successful registration, you might automatically log them in or redirect to a welcome page
  redirect('/login?success=true'); // Redirect to login with a success message
}