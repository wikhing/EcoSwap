import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, RefreshCw, Users } from 'lucide-react';

const HeroLanding: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div className="h-[50dvh] lg:h-screen w-full relative">
        <Image 
          src="/assets/landing/hero.png" 
          alt="Green Hills" 
          className="w-full h-full object-cover"
          width={1000}
          height={500}
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-white/10 backdrop-blur-[1px]">
          <h1 className="text-5xl lg:text-7xl font-bold text-(--black-color) drop-shadow-sm">
            Give Your Items a 2nd Life
          </h1>
          <p className="text-xl lg:text-2xl text-(--black-color) mt-6 max-w-2xl font-medium">
            Swap, donate, or find pre-loved items — reduce waste and help the planet.
          </p>
          <Link href="/signup" className="px-8 py-3 mt-16 bg-white text-3xl text-(--green-color) font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform">
            Begin your Reuse Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

const Banner: React.FC = () => {
  return (
    <div className="w-full h-[50dvh] lg:h-screen overflow-hidden">
      <Image
        width={1000}
        height={500}
        src="/assets/landing/middle_section.jpg" 
        alt="Sustainable Items" 
        className="w-full h-full object-cover object-center opacity-90"
      />

      {/* Animation Text Go In */}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      size: "lg:w-72 lg:h-72",
      title: "Browse or List",
      desc: "Explore items available for swap or list the things you no longer need.",
      img: "/assets/landing/landing_content_pic1.jpg",
      reverse: false
    },
    {
      size: "lg:w-96 lg:h-96",
      title: "Swap or Donate",
      desc: "Connect with other students to swap items or donate to the community.",
      img: "/assets/landing/landing_content_pic2.jpg",
      reverse: true
    },
    {
      size: "lg:w-90 lg:h-90",
      title: "Track & Contribute",
      desc: "Track your eco-impact and see how your swaps help create a sustainable campus.",
      img: "/assets/landing/landing_content_pic3.jpg",
      reverse: false
    }
  ];

  return (
    <section className="py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-(--green-color) mb-16">
        How EcoSwap Works?
      </h2>

      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const offsetClass = index % 2 === 0 ? 'translate-x-[32px]' : '-translate-x-[32px]';

          return (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${step.reverse ? 'md:flex-row-reverse' : ''}`}>
              {/* Image */}
              <div className={`w-64 h-64 ${step.size} shrink-0 relative flex justify-center items-center`}>
                <div className={`absolute w-full h-full bg-white rounded-full shadow-xl transition-transform duration-500 ${offsetClass}`}></div>
                <img 
                  src={step.img} 
                  alt={step.title} 
                  className="relative z-1 w-full h-full object-cover rounded-full shadow-sm"
                />
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-(--black-color) mb-4">{step.title}</h3>
                <p className="text-xl text-(--black-color) leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Impact: React.FC = () => {
  return (
    <section className="py-16 px-6 pb-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-(--black-color) mb-2">
          Explore How your Campus
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-(--black-color) mb-16">
          Community is Making an <span className="text-(--green-color)">Impact</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <Sprout size={80} className="text-lime-500 fill-current mb-4 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-(--black-color)">5 kg</h3>
            <h4 className="text-xl font-bold text-(--black-color) mb-2">CO₂ Reduced</h4>
            <p className="text-(--black-color) font-medium">equivalent to<br/>planting 2 trees</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <RefreshCw size={80} className="text-blue-400 fill-current mb-4 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-(--black-color)">10</h3>
            <h4 className="text-xl font-bold text-(--black-color) mb-2">Items Reused</h4>
            <p className="text-(--black-color) font-medium">making campus<br/>life greener</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <Users size={80} className="text-blue-600 fill-current mb-4 drop-shadow-md" />
            <h3 className="text-2xl font-bold text-(--black-color)">100</h3>
            <h4 className="text-xl font-bold text-(--black-color) mb-2">Active Student</h4>
            <p className="text-(--black-color) font-medium">helping each<br/>other & planet</p>
          </div>
        </div>

        <Link href="/signup" className="px-8 py-3 bg-(--green-color) text-white font-bold rounded-full shadow-lg hover:bg-green-800 transition">
          Make Your First Impact Today
        </Link>
      </div>
    </section>
  );
};

export default function Landing() {
  return (
    <div >
      <HeroLanding />
      <Banner />
      <HowItWorks />
      <Impact />
    </div>
  );
}