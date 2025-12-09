'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Explore', href: '/explore' }, 
    { name: 'Share', href: '/share' },
    { name: 'Impact', href: '/impact' },
    { name: 'Community', href: '/community' },
];

export default function Header() { 
    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();

    const handleLogout = (sectionId: string) => {

        // Logout

        router.push('/' + sectionId);
    };

    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white px-6 py-4 w-full z-10 top-0 left-0 lg:flex lg:flex-row lg:justify-between lg:items-center">
            <div className="flex flex-wrap flex-row max-w-full">
                <Link href="/" className="flex items-center no-underline" >
                    <Image src="/ecoswap_logo.jpg" alt="EcoSwap Logo" width={500} height={500} className="w-full ml-3 mr-3 h-12 lg:h-12"/>
                </Link>
                <button onClick={toggleMenu} className="lg:hidden ml-auto" title="Toggle Menu">
                    <svg className="h-6 w-6 fill-current text-black" viewBox="0 0 24 24">
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2z"
                        />
                    </svg>
                </button>
            </div>
            <div className={`flex flex-col ml-7 transition-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-80' : 'max-h-0'} lg:w-full lg:max-h-none lg:flex-row lg:justify-end`}>
                <div className="pl-6 self-start lg:m-auto">
                    <nav className="flex flex-col py-2 space-x-10 space-y-2 lg:flex-row lg:pl-0 lg:justify-self-center">
                        {
                            navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href}
                                    className="font-medium text-lg lg:my-0 hover:text-(--green-color) hover:underline"
                                >
                                    {link.name}
                                </Link>
                            ))
                        }
                        
                    </nav>
                </div>
                <div className="pl-6 self-start">
                    {
                        pathname !== '/profile' ?
                        <nav className="flex flex-col py-2 space-x-6 space-y-2 lg:flex-row lg:pl-0">
                            <Link className="w-28 h-fit text-center text-(--green-color) font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-white hover:bg-(--green-color) hover:text-white transition" 
                                href="login" 
                            >
                                Login
                            </Link>
                            <Link className="w-28 h-fit text-center text-white font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-(--green-color) hover:bg-white hover:text-(--green-color) transition" 
                                href="signup" 
                            >
                                Sign Up
                            </Link>
                    
                            {/* check user authentication status(loggedIn?) to show/hide notification and profile icons */}
                            <Link className="hidden" href="notification">
                                <img src="/assets/notification_icon.svg" alt="Notification" />
                            </Link>
                            <Link className="hidden" href="profile">
                                <img src="/assets/profile_icon.svg" alt="Profile" />
                            </Link>
                        </nav>
                        :
                        <button onClick={() => handleLogout('')} className="w-30 h-fit text-center text-(--green-color) font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-white hover:bg-(--green-color) hover:text-white transition cursor-pointer">
                            Sign Out
                        </button>
                    }
                </div>
            </div>
        </header>
    );
}