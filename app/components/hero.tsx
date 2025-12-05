
import React from 'react';
import Image from 'next/image';

const Hero: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => {
    return (
        <section className="relative h-[400px] w-full bg-[#1B5E20CC] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-40">
                <Image 
                    src="/assets/bg_hand.jpg" 
                    alt="Community Nature Background" 
                    fill 
                    className="object-cover" 
                    priority
                />
            </div>
        
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {title}
                </h1>
                <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto font-light">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default Hero;