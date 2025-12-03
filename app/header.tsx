'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleRouting = (sectionId: string) => {
        router.push('/' + sectionId);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white px-6 py-4 w-full z-10 top-0 left-0 lg:flex lg:flex-row lg:justify-between lg:items-center">
            <div className="flex flex-wrap flex-row max-w-full">
                <a href="#landing" onClick={() => handleRouting("")} className="flex items-center no-underline" >
                    <img src="/assets/ecoswap_logo.jpg" alt="EcoSwap Logo" className="ml-3 mr-3 h-12 lg:h-12"/>
                </a>
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
            <div className={`flex flex-col transition-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-80' : 'max-h-0'} lg:w-full lg:max-h-none lg:flex-row lg:justify-end`}>
                <div className="pl-6 self-start lg:m-auto">
                    <nav className="flex flex-col py-2 space-x-10 space-y-2 lg:flex-row lg:pl-0 lg:justify-self-center">
                        <a className="font-bold lg:my-0" href="home" onClick={() => handleRouting("home")}>Home</a>
                        <a className="font-bold lg:my-0" href="explore" onClick={() => handleRouting("explore")}>Explore</a>
                        <a className="font-bold lg:my-0" href="share" onClick={() => handleRouting("share")}>Share</a>
                        <a className="font-bold lg:my-0" href="impact" onClick={() => handleRouting("impact")}>Impact</a>
                        <a className="font-bold lg:my-0" href="community" onClick={() => handleRouting("community")}>Community</a>
                    </nav>
                </div>
                <div className="pl-6 self-start">
                    <nav className="flex flex-col py-2 space-x-6 space-y-2 lg:flex-row lg:pl-0">
                        <a className="w-28 h-fit text-center text-(--green-color) font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-white" 
                            href="login" 
                            onClick={() => handleRouting("login")}
                        >
                            Login
                        </a>
                        <a className="w-28 h-fit text-center text-white font-bold px-6 py-1 lg:my-0 rounded-full border-2 border-(--green-color) bg-(--green-color)" 
                            href="signup" 
                            onClick={() => handleRouting("signup")}
                        >
                            Sign Up
                        </a>
                    </nav>
                </div>
            </div>
            
            
            
        </header>
    );
}

export default Header;