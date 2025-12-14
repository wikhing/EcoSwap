'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Explore', href: '/explore' }, 
    { name: 'List', href: '/list' },
    { name: 'Impact', href: '/impact' },
    { name: 'Community', href: '/community' },
];

export default function Header() { 
    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();

    let isLoggedIn = true;

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
                            {
                                !isLoggedIn ? (
                                    <>
                                        <Link className="w-28 h-fit text-center text-(--green-color) font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-white hover:bg-(--green-color) hover:text-white transition" 
                                            href="login" 
                                        >
                                            Login
                                        </Link>
                                        <Link className="w-28 h-fit text-center whitespace-nowrap text-white font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-(--green-color) hover:bg-white hover:text-(--green-color) transition" 
                                            href="signup" 
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                ):(
                                    <div className='self-center items-center space-x-4 flex w-full h-full'>
                                        <Link className="w-6" href="notification">
                                            <svg className='w-6 hover:fill-(--green-color)' width="40" height="46" viewBox="0 0 40 46" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.439 0.981333C16.8902 1.472 16.4634 2.33067 16.4634 2.82133C16.5244 3.312 15.6098 4.048 14.5122 4.47733C13.4756 4.968 11.5244 6.256 10.2439 7.42133C8.96342 8.58667 7.37805 10.6107 6.70732 11.96C5.97561 13.4933 5.54878 15.7627 5.54878 18.0933C5.54878 20.1173 5.2439 23.4293 4.93902 25.4533C4.57317 27.4773 4.20732 29.624 4.02439 30.176C3.71951 31.2187 4.81707 31.28 20.1829 31.28C35.5488 31.28 36.6463 31.2187 36.3415 30.176C36.1585 29.624 35.7927 27.4773 35.4268 25.4533C35.122 23.4293 34.8171 20.1787 34.8171 18.216C34.8171 16.3147 34.4512 13.8 34.0244 12.696C33.5366 11.6533 32.2561 9.69067 31.0976 8.40267C29.939 7.11467 27.8659 5.52 26.4024 4.84533C25 4.232 23.8415 3.25067 23.8415 2.76C23.8415 2.26933 23.4146 1.41067 22.9268 0.92C22.439 0.429333 21.2195 0 20.2439 0C19.2683 0 17.9878 0.429333 17.439 0.981333ZM0.182927 36.616L0.365854 38.3333L14.6951 38.64C14.6951 42.2587 15.1829 43.424 16.2195 44.4667C17.3171 45.5707 18.4146 46 20.1829 46C22.0122 46 23.0488 45.632 24.1463 44.4667C25.1829 43.424 25.6707 42.2587 25.6707 40.7867V38.64L40 38.3333V35.2667L0 34.96L0.182927 36.616Z"/>
                                            </svg>
                                        </Link>
                                        <Link className="w-6" href="profile">
                                             <svg className='w-6 hover:fill-(--green-color)' width="47" height="47" viewBox="0 0 47 47" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.5 0C26.6163 0 29.605 1.23794 31.8085 3.44149C34.0121 5.64505 35.25 8.63371 35.25 11.75C35.25 14.8663 34.0121 17.855 31.8085 20.0585C29.605 22.2621 26.6163 23.5 23.5 23.5C20.3837 23.5 17.395 22.2621 15.1915 20.0585C12.9879 17.855 11.75 14.8663 11.75 11.75C11.75 8.63371 12.9879 5.64505 15.1915 3.44149C17.395 1.23794 20.3837 0 23.5 0ZM23.5 29.375C36.4837 29.375 47 34.6331 47 41.125V47H0V41.125C0 34.6331 10.5162 29.375 23.5 29.375Z"/>
                                            </svg>
                                        </Link>
                                    </div>
                                )
                            }
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