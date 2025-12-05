'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// 1. Import Image component
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Share', href: '/share' },
    { name: 'Impact', href: '/impact' },
    { name: 'Community', href: '/community' },
];

export default function Header() { 
    const pathname = usePathname();

    return (
        // 'sticky' keeps the nav at the top but reserves space for it so content isn't hidden
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-green-100 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* 2. CHANGED: Logo & Brand Section */}
                <Link href="/" className="flex items-center gap-3">
                    {/* Image Container */}
                    <div className="relative w-10 h-10 shrink-0">
                        <Image 
                            src="/ecoswap.png" 
                            alt="EcoSwap Logo" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    
                    {/* Text Container - Flex Column for vertical stacking */}
                    {/* Kept 'hidden sm:flex' so it hides on very small screens, matching previous behavior */}
                    <div className="hidden sm:flex flex-col justify-center leading-none">
                        <span className="text-xl font-extrabold text-green-900 leading-tight">EcoSwap</span>
                        <span className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">Sustainable item exchange</span>
                    </div>
                </Link>

                {/* Main Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            href={link.href}
                            className={`
                                text-sm font-medium transition duration-150 py-2 border-b-2 
                                ${pathname === link.href 
                                    ? 'text-green-700 border-green-700 font-semibold' 
                                    : 'text-gray-600 border-transparent hover:text-green-700 hover:border-green-300'
                                }
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Icons and Auth */}
                <div className="flex items-center space-x-4">
                    
                    {/* Notification Icon */}
                    <button className="text-gray-600 hover:text-green-700 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.425 6 9.296 6 12v2.158a2.032 2.032 0 01-.195.427L4 17h5m6 0a3 3 0 11-6 0m6 0v1"></path></svg>
                    </button>
                    
                    {/* Profile Icon */}
                    <Link href="/profile" className="text-gray-600 hover:text-green-700 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.938 13.938 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </Link>

                    {/* Auth Link */}
                    <Link href={"/login"} className="text-sm font-medium text-green-700 hover:text-red-600 transition">
                        Sign In
                    </Link>
                    
                </div>
            </div>
        </header>
    );
}